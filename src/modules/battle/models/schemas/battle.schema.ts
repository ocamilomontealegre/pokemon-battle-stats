import { model, Schema, type Document, type Types } from "mongoose";

export interface IBattle extends Document {
  readonly participants: Types.ObjectId[];
  readonly pokemons: Types.ObjectId[];
  readonly result: string;
  readonly winner: Types.ObjectId;
}

const BattleSchema = new Schema<IBattle>(
  {
    participants: { type: ["ObjectId"], ref: "Trainer", required: true },
    pokemons: { type: ["ObjectId"], ref: "Pokemon" },
    result: { type: String, required: true },
    winner: { type: "ObjectId", ref: "Trainer" },
  },
  { timestamps: true },
);

export const Battle = model<IBattle>("Battle", BattleSchema);

