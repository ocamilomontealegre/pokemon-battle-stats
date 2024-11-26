import { Container } from "inversify";
import { HealthModule } from "@health/health.module";
import { TrainerModule } from "@modules/trainer/trainer.module";
import { AppRouter } from "./router/app.router";
import { DatabaseModule } from "@common/database/database.module";
import { MongoService } from "@common/database/mongo/services/mongo.service";

export class AppModule {
  private readonly _container: Container;

  public constructor() {
    this._container = new Container();
    this._initializeModules();
  }

  private _initializeModules(): void {
    this._container.load(HealthModule, TrainerModule, DatabaseModule);
    this._container.bind<AppRouter>(AppRouter).toSelf().inSingletonScope();
  }

  public async startAsyncServices(): Promise<void> {
    const mongoService = this._container.get<MongoService>(MongoService);
    await mongoService.connect();
  }

  public getContainer(): Container {
    return this._container;
  }
}

