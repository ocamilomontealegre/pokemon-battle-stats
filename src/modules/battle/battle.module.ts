import { ContainerModule, type interfaces } from "inversify";
import { BattleController } from "./controllers/battle.controller";
import { BattleService } from "./services/battle.service";
import { BattleRepository } from "./repositories/battle.repository";

export const BattleModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<BattleController>(BattleController).toSelf().inSingletonScope();
  bind<BattleService>(BattleService).toSelf().inSingletonScope();
  bind<BattleRepository>(BattleRepository).toSelf().inSingletonScope();
});

