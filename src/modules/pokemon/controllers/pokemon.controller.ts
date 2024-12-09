import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { PokemonService } from "../services/pokemon.service";
import { CreatePokemonDto } from "../models/dto";
import { POKEMON_ENDPOINT } from "../models/constants/pokemon-endpoint.constant";
import type { IPokemon } from "../models/schemas/pokemon.schema";

@controller(`/${POKEMON_ENDPOINT}`)
export class PokemonController {
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

