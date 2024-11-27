import { inject } from "inversify";
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  requestBody,
  requestParam,
  type Controller,
} from "inversify-express-utils";
import { TrainerService } from "../services/trainer.service";
import { TRAINER_ENDPOINT } from "../models/constants";
import type { CreateTrainerDto, UpdateTrainerDto } from "../models/dto";
import type { ITrainer } from "../models/schemas/trainer.schema";

@controller(TRAINER_ENDPOINT)
// @ts-expect-error: TrainerController is missing index signature for 'string'
export class TrainerController implements Controller {
  public constructor(
    @inject(TrainerService) private readonly trainerService: TrainerService,
  ) {}

  @httpPost("/")
  public async create(@requestBody() trainer: CreateTrainerDto): Promise<ITrainer> {
    return this.trainerService.create(trainer);
  }

  @httpGet("/")
  public async get(): Promise<ITrainer[]> {
    return this.trainerService.get();
  }

  @httpGet("/:id")
  public async getById(@requestParam("id") id: string): Promise<ITrainer> {
    return this.trainerService.getById(id);
  }

  @httpPut("/:id")
  public async update(
    @requestParam("id") id: string,
    @requestBody() trainer: UpdateTrainerDto,
  ): Promise<ITrainer> {
    return this.trainerService.update(id, trainer);
  }

  @httpDelete(":/id")
  public async delete(@requestParam("id") id: string): Promise<ITrainer> {
    return this.trainerService.delete(id);
  }
}

