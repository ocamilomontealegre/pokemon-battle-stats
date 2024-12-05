import { model, Schema, type Document } from "mongoose";

export interface IBattle extends Document {
  readonly participants: string[];
  readonly pokemons: string[];
  readonly result: string[];
  readonly winner: string[];
}

const BattleSchema = new Schema<IBattle>({});

export const Battle = model<IBattle>("Battle", BattleSchema);

