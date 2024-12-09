import { model, Schema, type Document } from "mongoose";

export interface IPokemon extends Document {
  readonly name: string;
  readonly type: string;
  readonly level: number;
  readonly healthPoints: number;
  readonly attack: number;
  readonly defense: number;
}

const PokemonSchema = new Schema<IPokemon>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  level: { type: Number, required: true },
  healthPoints: { type: Number, required: true },
  attack: { type: Number, required: true },
  defense: { type: Number, required: true },
});

export const Pokemon = model<IPokemon>("Pokemon", PokemonSchema);

