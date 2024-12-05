import { inject, injectable } from "inversify";
import { PokemonRepository } from "../repositories/pokemon.repository";

@injectable()
export class PokemonService {
  public constructor(
    @inject(PokemonRepository) private readonly pokemonRepository: PokemonRepository,
  ) {}
}

