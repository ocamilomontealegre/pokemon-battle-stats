import { inject } from "inversify";
import {
  controller,
  httpGet,
  httpPost,
  requestBody,
  type Controller,
} from "inversify-express-utils";
import { TrainerService } from "../services/trainer.service";
import { ITrainer } from "../models/schemas/trainer.schema";
import { TRAINER_ENDPOINT } from "../models/constants";
import type { CreateTrainerDto } from "../models/dto";

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
}

