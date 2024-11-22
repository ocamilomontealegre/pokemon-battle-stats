import { ContainerModule, type interfaces } from "inversify";
import { TrainerController } from "./controllers/trainer.controller";
import { TrainerService } from "./services/trainer.service";

export const TrainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<TrainerController>(TrainerController).toSelf().inSingletonScope();
  bind<TrainerService>(TrainerService).toSelf().inSingletonScope();
});

