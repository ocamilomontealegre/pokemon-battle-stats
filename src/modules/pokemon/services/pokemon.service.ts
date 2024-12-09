import { inject, injectable } from "inversify";
import { EventEmitter } from "eventemitter3";
import { PokemonRepository } from "../repositories/pokemon.repository";
import { CreatePokemonDto } from "../models/dto";
import type { IPokemon } from "../models/schemas/pokemon.schema";

@injectable()
export class PokemonService {
  public constructor(
    @inject(EventEmitter) private readonly eventEmitter: EventEmitter,
    @inject(PokemonRepository)
    private readonly pokemonRepository: PokemonRepository,
  ) {
    // this.eventEmitter.on("pokemon", (data) => console.log("data: ", data));
  }

  public async create(pokemon: CreatePokemonDto): Promise<IPokemon> {
    return this.pokemonRepository.create(pokemon);
  }

  public async find(): Promise<IPokemon[]> {
    return this.pokemonRepository.find({ options: { lean: true } });
  }

  // public async createMany(pokemons: CreatePokemonDto[]): Promise<void> {}
}

