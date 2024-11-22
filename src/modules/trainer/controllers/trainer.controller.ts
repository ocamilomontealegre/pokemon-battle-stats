import { inject } from "inversify";
import { controller, type Controller } from "inversify-express-utils";
import { TrainerService } from "../services/trainer.service";

@controller("trainers")
// @ts-expect-error: HealthController is missing index signature for 'string'
export class TrainerController implements Controller {
  public constructor(
    @inject(TrainerService) private readonly _trainerService: TrainerService,
  ) {}
}

