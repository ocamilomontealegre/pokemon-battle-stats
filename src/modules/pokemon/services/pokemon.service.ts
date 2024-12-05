import { inject, injectable } from "inversify";
import { PokemonRepository } from "../repositories/pokemon.repository";
import { CreatePokemonDto } from "../models/dto";
import type { IPokemon } from "../models/schemas/pokemon.schema";

@injectable()
export class PokemonService {
  public constructor(
    @inject(PokemonRepository) private readonly pokemonRepository: PokemonRepository,
  ) {}

  public async create(pokemon: CreatePokemonDto): Promise<IPokemon> {
    return this.pokemonRepository.create(pokemon);
  }
}

