import { injectable } from "inversify";
import { MongoRepository } from "@common/database/mongo/repositories/mongo.repository";
import { Pokemon, type IPokemon } from "../models/schemas/pokemon.schema";

@injectable()
export class PokemonRepository extends MongoRepository<IPokemon> {
  public constructor() {
    super(Pokemon);
  }
}

