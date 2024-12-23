import { inject, injectable } from "inversify";
import { NotFoundException } from "@common/exceptions";
import { BattleRepository } from "../repositories/battle.repository";
import { CreateBattleDto } from "../models/dto";
import { UpdateBattleDto } from "../models/dto/update-battle.dto";
import type { IBattle } from "../models/schemas/battle.schema";
import { PokemonRepository } from "@modules/pokemon/repositories/pokemon.repository";

@injectable()
export class BattleService {
  private readonly options = { lean: true };

  public constructor(
    @inject(BattleRepository) private readonly battleRepository: BattleRepository,
    @inject(PokemonRepository) private readonly pokemonRepository: PokemonRepository,
  ) {}

  public async create(battleData: CreateBattleDto): Promise<IBattle> {
    const { participants, pokemons, result, winner } = battleData;

    const existingPokemon = await this.pokemonRepository.find({
      filter: { $in: pokemons },
    });
    console.log("🚀 ~ BattleService ~ create ~ existingPokemon:", existingPokemon);

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

