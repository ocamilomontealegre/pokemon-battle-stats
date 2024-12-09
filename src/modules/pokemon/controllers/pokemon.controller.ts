import { inject } from "inversify";
import {
  controller,
  httpGet,
  httpPost,
  type Controller,
} from "inversify-express-utils";
import { PokemonService } from "../services/pokemon.service";
import { CreatePokemonDto } from "../models/dto";
import type { IPokemon } from "../models/schemas/pokemon.schema";

@controller("")
// @ts-expect-error: PokemonController is missing index signature for 'string'
export class PokemonController implements Controller {
  public constructor(
    @inject(PokemonService) private readonly pokemonService: PokemonService,
  ) {}

  @httpPost("/")
  public async create(pokemon: CreatePokemonDto): Promise<IPokemon> {
    return this.pokemonService.create(pokemon);
  }

  @httpGet("/")
  public async find(): Promise<IPokemon[]> {
    return this.pokemonService.find();
  }
}


