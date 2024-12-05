import { inject } from "inversify";
import { controller, type Controller } from "inversify-express-utils";
import { BattleService } from "../services/battle.service";

@controller("")
// @ts-expect-error: BattleController is missing index signature for 'string'
export class BattleController implements Controller {
  public constructor(
    @inject(BattleService) private readonly battleService: BattleService,
  ) {}
}

