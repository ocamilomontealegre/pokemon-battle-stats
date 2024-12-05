import { model, Schema, type Document } from "mongoose";

export interface ITrainer extends Document {
  readonly name: string;
  readonly age: number;
  readonly region: string;
}

const TrainerSchema = new Schema<ITrainer>(
  {
    name: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    region: { type: String },
  },
  { timestamps: true },
);

export const Trainer = model<ITrainer>("Trainer", TrainerSchema);

