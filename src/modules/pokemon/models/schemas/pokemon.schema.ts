import { model, Schema, type Document } from "mongoose";

export interface IPokemon extends Document {
  readonly name: string;
  readonly types: string[];
  readonly level: number;
  readonly healthPoints: number;
  readonly attack: number;
  readonly defense: number;
}

const PokemonSchema = new Schema<IPokemon>(
  {
    name: { type: String, unique: true, required: true },
    types: { type: [String], required: true },
    level: { type: Number, required: true },
    healthPoints: { type: Number, required: true },
    attack: { type: Number, required: true },
    defense: { type: Number, required: true },
  },
  { timestamps: true },
);

export const Pokemon = model<IPokemon>("Pokemon", PokemonSchema);

export const pokemonKeys = Object.keys(PokemonSchema.obj);

