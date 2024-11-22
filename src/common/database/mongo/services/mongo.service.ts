import { injectable } from "inversify";
import { connect } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

@injectable()
export class MongoService {
  private _mongoServer: MongoMemoryServer;

  private async _getConnectionUri(): Promise<string> {
    this._mongoServer = await MongoMemoryServer.create();
    return this._mongoServer.getUri();
  }

  public async connect(): Promise<void> {
    const uri = await this._getConnectionUri();
    connect(uri);
  }
}

