import { Container } from "inversify";
import { EventEmitter } from "eventemitter3";
import { HealthModule } from "@health/health.module";
import { DatabaseModule } from "@common/database/database.module";
import { BattleModule } from "@modules/battle/battle.module";
import { PokemonModule } from "@modules/pokemon/pokemon.module";
import { TrainerModule } from "@modules/trainer/trainer.module";
import { UploadModule } from "@common/modules/upload/upload.module";
import { MongoService } from "@common/database/mongo/services/mongo.service";
import { AppRouter } from "./router/app.router";

export class AppModule {
  private readonly container: Container;

  public constructor() {
    this.container = new Container();
    this._initializeModules();
  }

  private _initializeModules(): void {
    this.container.load(
      HealthModule,
      DatabaseModule,
      BattleModule,
      PokemonModule,
      TrainerModule,
      UploadModule,
    );
    this.container.bind<EventEmitter>(EventEmitter).toConstantValue(new EventEmitter());
    this.container.bind<AppRouter>(AppRouter).toSelf().inSingletonScope();
  }

  public async startAsyncServices(): Promise<void> {
    const mongoService = this.container.get<MongoService>(MongoService);
    await mongoService.start();
  }

  public getContainer(): Container {
    return this.container;
  }
}

