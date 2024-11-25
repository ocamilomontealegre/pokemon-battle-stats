import { inject, injectable } from "inversify";
import { TrainerRepository } from "../repositories/trainer.repository";
import { ITrainer } from "../models/schemas/trainer.schema";
import type { CreateTreanerDto } from "../models/dto";

@injectable()
export class TrainerService {
  public constructor(
    @inject(TrainerRepository)
    private readonly trainerRepository: TrainerRepository,
  ) {}

  public create(trainer: CreateTreanerDto): Promise<ITrainer> {
    return this.trainerRepository.create(trainer);
  }
}

