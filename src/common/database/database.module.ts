import { ContainerModule, type interfaces } from "inversify";
import { MongoService } from "./mongo/services/mongo.service";

export const DatabaseModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<MongoService>(MongoService).toSelf().inSingletonScope();
});

