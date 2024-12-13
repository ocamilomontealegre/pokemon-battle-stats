import { unlinkSync } from "node:fs";
import { inject, injectable } from "inversify";
import { EventEmitter } from "eventemitter3";
import { toJSON } from "danfojs-node";
import { FileUtils } from "@common/utils";
import { PokemonRepository } from "../repositories/pokemon.repository";
import { CreatePokemonDto } from "../models/dto";
import { pokemonKeys, type IPokemon } from "../models/schemas/pokemon.schema";
import { Logger } from "@common/logger/logger.config";

@injectable()
export class PokemonService {
  private readonly logger = new Logger(PokemonService.name);
  private readonly readCsv = FileUtils.readCsvFile;
  private readonly entityKeys = pokemonKeys;

  public constructor(
    @inject(EventEmitter) private readonly eventEmitter: EventEmitter,
    @inject(PokemonRepository)
    private readonly pokemonRepository: PokemonRepository,
  ) {
    this.eventEmitter.on("pokemon", this.handlePokemonEvent.bind(this));
  }

  private async handlePokemonEvent(filepath: string): Promise<void> {
    const csvData = await this.readCsv(filepath, this.entityKeys);
    const transformedData = toJSON(csvData);
    const result = await this.createMany(transformedData as IPokemon[]);
    this.logger.debug(`Pokemon[${result.length}] were created`);

    unlinkSync(filepath);
  }

  public async create(pokemon: CreatePokemonDto): Promise<IPokemon> {
    return this.pokemonRepository.create(pokemon);
  }

  public async find(): Promise<IPokemon[]> {
    return this.pokemonRepository.find({ options: { lean: true } });
  }

  public async createMany(
    pokemons: CreatePokemonDto[],
  ): Promise<Omit<Partial<IPokemon>, "_id">[]> {
    return this.pokemonRepository.createMany(pokemons);
  }
}

