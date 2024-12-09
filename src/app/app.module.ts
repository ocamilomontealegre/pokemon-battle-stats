import { Container } from "inversify";
import { HealthModule } from "@health/health.module";
import { DatabaseModule } from "@common/database/database.module";
import { BattleModule } from "@modules/battle/battle.module";
import { PokemonModule } from "@modules/pokemon/pokemon.module";
import { TrainerModule } from "@modules/trainer/trainer.module";
import { UploadModule } from "@common/modules/upload/upload.module";
import { MongoService } from "@common/database/mongo/services/mongo.service";
import { AppRouter } from "./router/app.router";

export class AppModule {
  private readonly _container: Container;

  public constructor() {
    this._container = new Container();
    this._initializeModules();
  }

  private _initializeModules(): void {
    this._container.load(
      HealthModule,
      DatabaseModule,
      BattleModule,
      PokemonModule,
      TrainerModule,
      UploadModule,
    );
    this._container.bind<AppRouter>(AppRouter).toSelf().inSingletonScope();
  }

  public async startAsyncServices(): Promise<void> {
    const mongoService = this._container.get<MongoService>(MongoService);
    await mongoService.start();
  }

  public getContainer(): Container {
    return this._container;
  }
}

