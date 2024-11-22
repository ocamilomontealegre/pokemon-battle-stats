import { model, Schema, type Document } from "mongoose";

export interface ITrainer extends Document {
  readonly name: string;
  readonly age: number;
  readonly region: string;
}

export const TrainerSchema = new Schema<ITrainer>({
  name: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  region: { type: String },
});

export const Trainer = model<ITrainer>("Trainer", TrainerSchema);

