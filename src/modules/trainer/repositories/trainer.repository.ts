import { injectable } from "inversify";
import { MongoRepository } from "@common/database/mongo/repositories/mongo.repository";
import { Trainer, type ITrainer } from "../models/schemas/trainer.schema";

@injectable()
export class TrainerRepository extends MongoRepository<ITrainer> {
  public constructor() {
    super(Trainer);
  }
}

