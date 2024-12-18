import { unlinkSync } from "node:fs";
import { inject, injectable } from "inversify";
import { EventEmitter } from "eventemitter3";
import { toJSON } from "danfojs-node";
import { FileUtils } from "@common/utils";
import { Logger } from "@common/logger/logger.config";
import { NotFoundException } from "@common/exceptions";
import { PokemonRepository } from "../repositories/pokemon.repository";
import { strongestPokemonPipeline } from "../models/pipelines";
import { pokemonKeys, type IPokemon } from "../models/schemas/pokemon.schema";
import { CreatePokemonDto, UpdatePokemonDto } from "../models/dto";
import { Types, type PipelineStage } from "mongoose";

@injectable()
export class PokemonService {
  private readonly logger = new Logger(PokemonService.name);
  private readonly readCsv = FileUtils.readCsvFile;
  private readonly entityKeys = pokemonKeys;
  private readonly queryOptions = { lean: true };

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

  public async create(pokemonData: CreatePokemonDto): Promise<IPokemon> {
    return this.pokemonRepository.create(pokemonData);
  }

  public async createMany(
    pokemons: UpdatePokemonDto[],
  ): Promise<Omit<Partial<IPokemon>, "_id">[]> {
    return this.pokemonRepository.createMany(pokemons);
  }

  public async find(): Promise<IPokemon[]> {
    return this.pokemonRepository.find({ options: this.queryOptions });
  }

  public async findById(id: string): Promise<IPokemon> {
    const pokemon = await this.pokemonRepository.findById({
      id,
      options: this.queryOptions,
    });
    if (!pokemon) throw new NotFoundException("Pokemon not found");
    return pokemon;
  }

  public async findStrongest(): Promise<IPokemon> {
    const [pokemon] = await this.pokemonRepository.aggregate(strongestPokemonPipeline);
    if (!pokemon) throw new NotFoundException("Pokemon not found");
    return pokemon;
  }

  public async findStrongestOne(pokemons: string[]): Promise<IPokemon> {
    const pokemonIds = pokemons.map((pokemon) => new Types.ObjectId(pokemon));

    const pipeline: PipelineStage[] = [
      {
        $match: {
          _id: { $in: pokemonIds },
        },
      },
    ];

    const [pokemon] = await this.pokemonRepository.aggregate([
      ...pipeline,
      ...strongestPokemonPipeline,
    ]);
    if (!pokemon) throw new NotFoundException("Pokemon not found");
    return pokemon;
  }

  public async updateById(
    id: string,
    pokemonData: UpdatePokemonDto,
  ): Promise<IPokemon> {
    const pokemon = await this.pokemonRepository.findByIdAndUpdate({
      id,
      updateData: pokemonData,
      options: this.queryOptions,
    });
    if (!pokemon) throw new NotFoundException("Pokemon not found");
    return pokemon;
  }

  public async deleteById(id: string): Promise<IPokemon> {
    const pokemon = await this.pokemonRepository.findByIdAndDelete({
      id,
      options: this.queryOptions,
    });
    if (!pokemon) throw new NotFoundException("Pokemon not found");
    return pokemon;
  }
}

