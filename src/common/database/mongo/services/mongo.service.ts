import { injectable } from "inversify";
import { connect } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Logger } from "@common/logger/logger.config";

@injectable()
export class MongoService {
  private mongoServer: MongoMemoryServer;
  private readonly logger = new Logger(MongoService.name);

  private async _getConnectionUri(): Promise<string> {
    this.mongoServer = await MongoMemoryServer.create();
    return this.mongoServer.getUri();
  }

  public async start(): Promise<void> {
    const uri = await this._getConnectionUri();
    connect(uri);
    this.logger.info(`Successfully connected to ${uri}`);
  }
}

