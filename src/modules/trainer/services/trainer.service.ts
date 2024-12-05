import { inject, injectable } from "inversify";
import { NotFoundException } from "@common/exceptions";
import { TrainerRepository } from "../repositories/trainer.repository";
import { TrainerUtils } from "../utils/trainer.util";
import { Trainer, type ITrainer } from "../models/schemas/trainer.schema";
import { CreateTrainerDto, UpdateTrainerDto } from "../models/dto";

@injectable()
export class TrainerService {
  private readonly trainerProjection = TrainerUtils.getTrainerProjection();
  private readonly queryOptions = { lean: true };

  public constructor(
    @inject(TrainerRepository)
    private readonly trainerRepository: TrainerRepository,
  ) {}

  public async create(trainer: CreateTrainerDto): Promise<ITrainer> {
    return this.trainerRepository.create(trainer);
  }

  public async get(): Promise<ITrainer[]> {
    return this.trainerRepository.find({
      projection: this.trainerProjection,
      options: this.queryOptions,
    });
  }

  public async getById(id: string): Promise<ITrainer> {
    const result = await this.trainerRepository.findById({
      id,
      projection: this.trainerProjection,
      options: this.queryOptions,
    });
    if (!result)
      throw new NotFoundException(`${Trainer.modelName} with id ${id} not found`);
    return result;
  }

  public async update(id: string, trainer: UpdateTrainerDto): Promise<ITrainer> {
    const result = await this.trainerRepository.findByIdAndUpdate({
      filter: { id },
      updateData: trainer,
      projection: this.trainerProjection,
      options: this.queryOptions,
    });
    if (!result) throw new NotFoundException(`${Trainer.name} with id ${id} not found`);
    return result;
  }

  public async delete(id: string): Promise<ITrainer> {
    const result = await this.trainerRepository.findByIdAndDelete({
      id,
      projection: this.queryOptions,
    });
    if (!result) throw new NotFoundException(`${Trainer.name} with id ${id} not found`);
    return result;
  }
}

