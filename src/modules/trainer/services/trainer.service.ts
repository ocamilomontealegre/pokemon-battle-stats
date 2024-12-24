import { unlinkSync } from "node:fs";
import { inject, injectable } from "inversify";
import { toJSON } from "danfojs-node";
import { EventEmitter } from "eventemitter3";
import { FileUtils } from "@common/utils";
import { NotFoundException } from "@common/exceptions";
import { Logger } from "@common/logger/logger.config";
import { TrainerRepository } from "../repositories/trainer.repository";
import { TrainerUtils } from "../utils/trainer.util";
import { Trainer, trainerKeys, type ITrainer } from "../models/schemas/trainer.schema";
import { CreateTrainerDto, UpdateTrainerDto } from "../models/dto";

@injectable()
export class TrainerService {
  private readonly logger = new Logger(Trainer.name);
  private readonly trainerProjection = TrainerUtils.getTrainerProjection();
  private readonly readCsv = FileUtils.readCsvFile;
  private readonly entityKeys = trainerKeys;
  private readonly queryOptions = { lean: true };

  public constructor(
    @inject(EventEmitter) private readonly eventEmitter: EventEmitter,
    @inject(TrainerRepository)
    private readonly trainerRepository: TrainerRepository,
  ) {
    this.eventEmitter.on("pokemon", this.handleTrainerEvent.bind(this));
  }

  private async handleTrainerEvent(filepath: string): Promise<void> {
    const csvData = await this.readCsv(filepath, this.entityKeys);
    const transformedData = toJSON(csvData);

    const result = await this.createMany(transformedData as ITrainer[]);
    this.logger.debug(`Pokemon[${result.length}] were created`);

    unlinkSync(filepath);
  }

  public async create(trainer: CreateTrainerDto): Promise<ITrainer> {
    return this.trainerRepository.create(trainer);
  }

  public async createMany(
    trainers: CreateTrainerDto[],
  ): Promise<Omit<Partial<ITrainer>, "_id">[]> {
    return this.trainerRepository.createMany(trainers);
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
      id,
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

