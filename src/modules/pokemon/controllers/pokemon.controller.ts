import { inject } from "inversify";
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  requestBody,
  requestParam,
} from "inversify-express-utils";
import { PokemonService } from "../services/pokemon.service";
import { CreatePokemonDto, UpdatePokemonDto } from "../models/dto";
import { POKEMON_ENDPOINT } from "../models/constants/pokemon-endpoint.constant";
import type { IPokemon } from "../models/schemas/pokemon.schema";

@controller(`/${POKEMON_ENDPOINT}`)
export class PokemonController {
  public constructor(
    @inject(PokemonService) private readonly pokemonService: PokemonService,
  ) {}

  @httpPost("/")
  public async create(@requestBody() pokemonData: CreatePokemonDto): Promise<IPokemon> {
    return this.pokemonService.create(pokemonData);
  }

  @httpGet("/")
  public async find(): Promise<IPokemon[]> {
    return this.pokemonService.find();
  }

  @httpGet("/strongest")
  public async findStrongest(): Promise<IPokemon> {
    return this.pokemonService.findStrongest();
  }

  @httpPut("/")
  public async update(
    @requestParam("id") id: string,
    @requestBody() pokemonData: UpdatePokemonDto,
  ): Promise<IPokemon> {
    return this.pokemonService.updateById(id, pokemonData);
  }

  @httpDelete("/")
  public async delete(@requestParam("id") id: string): Promise<IPokemon> {
    return this.pokemonService.deleteById(id);
  }
}

