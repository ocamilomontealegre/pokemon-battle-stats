import { ContainerModule, type interfaces } from "inversify";
import { PokemonController } from "./controllers/pokemon.controller";
import { PokemonService } from "./services/pokemon.service";
import { PokemonRepository } from "./repositories/pokemon.repository";

export const PokemonModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<PokemonController>(PokemonController).toSelf().inSingletonScope();
  bind<PokemonService>(PokemonService).toSelf().inSingletonScope();
  bind<PokemonRepository>(PokemonRepository).toSelf().inSingletonScope();
});

