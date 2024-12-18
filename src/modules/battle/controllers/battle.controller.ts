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
import { BattleService } from "../services/battle.service";
import { IBattle } from "../models/schemas/battle.schema";
import { CreateBattleDto } from "../models/dto";
import { UpdateBattleDto } from "../models/dto/update-battle.dto";
import { BATTLE_ENDPOINT } from "../models/constants/battle-endpoint.constant";

@controller(`/${BATTLE_ENDPOINT}`)
export class BattleController implements Controller {
  public constructor(
    @inject(BattleService) private readonly battleService: BattleService,
  ) {}

  @httpPost("/")
  public async create(@requestBody() battleData: CreateBattleDto): Promise<IBattle> {
    return this.battleService.create(battleData);
  }

  @httpGet("/")
  public async get(): Promise<IBattle[]> {
    return this.battleService.get();
  }

  @httpPut("/")
  public async updateById(
    @requestParam("id") id: string,
    @requestBody() battleData: UpdateBattleDto,
  ): Promise<IBattle> {
    return this.battleService.updateById(id, battleData);
  }

  @httpDelete("/")
  public async deleteById(@requestParam("id") id: string): Promise<IBattle> {
    return this.battleService.deleteById(id);
  }
}

