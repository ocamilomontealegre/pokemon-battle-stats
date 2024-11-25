import { ContainerModule, type interfaces } from "inversify";
import { TrainerController } from "./controllers/trainer.controller";
import { TrainerService } from "./services/trainer.service";
import { TrainerRepository } from "./repositories/trainer.repository";

export const TrainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<TrainerController>(TrainerController).toSelf().inSingletonScope();
  bind<TrainerService>(TrainerService).toSelf().inSingletonScope();
  bind<TrainerRepository>(TrainerRepository).toSelf().inSingletonScope();
});

