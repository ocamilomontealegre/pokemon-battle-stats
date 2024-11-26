import { inject, injectable } from "inversify";
import { TrainerRepository } from "../repositories/trainer.repository";
import { ITrainer } from "../models/schemas/trainer.schema";
import type { CreateTrainerDto } from "../models/dto";

@injectable()
export class TrainerService {
  public constructor(
    @inject(TrainerRepository)
    private readonly trainerRepository: TrainerRepository,
  ) {}

  public async create(trainer: CreateTrainerDto): Promise<ITrainer> {
    return this.trainerRepository.create(trainer);
  }

  public async get(): Promise<ITrainer[]> {
    return this.trainerRepository.find();
  }

  public async getById(id: string): Promise<ITrainer> {
    return this.trainerRepository.findById(id);
  }
}

