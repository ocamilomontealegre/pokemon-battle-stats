import { inject } from "inversify";
import { controller, type Controller } from "inversify-express-utils";
import { PokemonService } from "../services/pokemon.service";

@controller("")
// @ts-expect-error: PokemonController is missing index signature for 'string'
export class PokemonController implements Controller {
  public constructor(
    @inject(PokemonService) private readonly pokemonService: PokemonService,
  ) {}
}

