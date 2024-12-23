import { injectable } from "inversify";
import { connect } from "mongoose";
import { Logger } from "@common/logger/logger.config";
import { mongoConfig } from "@common/env";

@injectable()
export class MongoService {
  private readonly mongoEnv: typeof mongoConfig;
  private readonly logger = new Logger(MongoService.name);

  public constructor() {
    this.mongoEnv = mongoConfig;
  }

  // private mongoServer: MongoMemoryServer;

  // private async _getConnectionUri(): Promise<string> {
  //   this.mongoServer = await MongoMemoryServer.create();
  //   return this.mongoServer.getUri();
  // }

  // public async start(): Promise<void> {
  //   const uri = await this._getConnectionUri();
  //   connect(uri);
  //   this.logger.info(`Successfully connected to ${uri}`);
  // }

  public async start(): Promise<void> {
    connect(this.mongoEnv.url);
    this.logger.info(`Successfully connected to ${this.mongoEnv.url}`);
  }
}

