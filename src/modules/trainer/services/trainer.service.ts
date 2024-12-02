import { inject, injectable } from "inversify";
import { NotFoundException } from "@common/exceptions";
import { TrainerRepository } from "../repositories/trainer.repository";
import { Trainer, type ITrainer } from "../models/schemas/trainer.schema";
import { CreateTrainerDto, UpdateTrainerDto } from "../models/dto";

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
    const result = await this.trainerRepository.findById(id);
    if (!result)
      throw new NotFoundException(`${Trainer.modelName} with id ${id} not found`);
    return result;
  }

  public async update(id: string, trainer: UpdateTrainerDto): Promise<ITrainer> {
    const result = await this.trainerRepository.findByIdAndUpdate(id, trainer);
    if (!result) throw new NotFoundException(`${Trainer.name} with id ${id} not found`);
    return result;
  }

  public async delete(id: string): Promise<ITrainer> {
    const result = await this.trainerRepository.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`${Trainer.name} with id ${id} not found`);
    return result;
  }
}

