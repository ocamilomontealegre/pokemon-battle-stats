import { injectable } from "inversify";
import { MongoRepository } from "@common/database/mongo/repositories/mongo.repository";
import { Battle, type IBattle } from "../models/schemas/battle.schema";

@injectable()
export class BattleRepository extends MongoRepository<IBattle> {
  public constructor() {
    super(Battle);
  }
}

