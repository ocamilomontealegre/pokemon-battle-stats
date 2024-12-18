import { inject, injectable } from "inversify";
import { NotFoundException } from "@common/exceptions";
import { BattleRepository } from "../repositories/battle.repository";
import { CreateBattleDto } from "../models/dto";
import { UpdateBattleDto } from "../models/dto/update-battle.dto";
import type { IBattle } from "../models/schemas/battle.schema";

@injectable()
export class BattleService {
  private readonly options = { lean: true };

  public constructor(
    @inject(BattleRepository) private readonly battleRepository: BattleRepository,
  ) {}

  public async create(battleData: CreateBattleDto): Promise<IBattle> {
    return this.battleRepository.create(battleData);
  }

  public async get(): Promise<IBattle[]> {
    return this.battleRepository.find({ options: this.options });
  }

  public async getById(id: string): Promise<IBattle> {
    const battle = this.battleRepository.findById({ id, options: this.options });
    if (!battle) throw new NotFoundException(`Battle record with id: ${id} not found`);
    return battle;
  }

  public async updateById(id: string, battleData: UpdateBattleDto): Promise<IBattle> {
    const battle = this.battleRepository.findByIdAndUpdate({
      id,
      updateData: battleData,
      options: this.options,
    });
    if (!battle) throw new NotFoundException(`Battle record with id: ${id} not found`);
    return battle;
  }

  public async deleteById(id: string): Promise<IBattle> {
    const battle = this.battleRepository.findByIdAndDelete({
      id,
      options: this.options,
    });
    if (!battle) throw new NotFoundException(`Battle record with id: ${id} not found`);
    return battle;
  }
}

