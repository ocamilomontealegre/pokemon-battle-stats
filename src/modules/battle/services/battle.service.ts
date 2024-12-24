import { inject, injectable } from "inversify";
import { Types } from "mongoose";
import { HTTPException, NotFoundException } from "@common/exceptions";
import { PokemonService } from "@modules/pokemon/services/pokemon.service";
import { TrainerService } from "@modules/trainer/services/trainer.service";
import { BattleRepository } from "../repositories/battle.repository";
import { CreateBattleDto } from "../models/dto";
import { UpdateBattleDto } from "../models/dto/update-battle.dto";
import type { IBattle } from "../models/schemas/battle.schema";

@injectable()
export class BattleService {
  private readonly options = { lean: true };

  public constructor(
    @inject(BattleRepository) private readonly battleRepository: BattleRepository,
    @inject(TrainerService) private readonly trainerService: TrainerService,
    @inject(PokemonService) private readonly pokemonService: PokemonService,
  ) {}

  public async create(battleData: CreateBattleDto): Promise<IBattle> {
    const { participants } = battleData;

    const trainers = await Promise.all(
      participants.map(async (participant) => {
        const result = await this.trainerService.getById(participant.id);
        return result._id as Types.ObjectId;
      }),
    );
    if (!trainers || trainers.length < 2)
      throw new HTTPException(404, "Not enought valid trainers");

    const pokemons = await Promise.all(
      participants.map(async (participant) => {
        const result = await this.pokemonService.findById(participant.pokemon);
        return result._id as Types.ObjectId;
      }),
    );
    if (!pokemons || pokemons.length < 2)
      throw new HTTPException(404, "Not enought valid trainers");

    const filteredPokemons = pokemons.map((pokemon) => pokemon.toString());
    const strongestPokemon = await this.pokemonService.findStrongestOne(
      filteredPokemons,
    );

    const winner = battleData.participants.find(
      (participant) => participant.pokemon === String(strongestPokemon._id),
    );

    const battle = {
      participants: trainers,
      pokemons,
      result: "OK",
      winner: new Types.ObjectId(winner.id),
    };

    return this.battleRepository.create(battle);
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

