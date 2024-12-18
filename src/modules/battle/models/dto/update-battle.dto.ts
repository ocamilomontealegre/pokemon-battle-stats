import z from "zod";
import { Types } from "mongoose";

export const UpdateBattleDto = z.object({
  participants: z.array(z.instanceof(Types.ObjectId)).optional(),
  pokemons: z.array(z.instanceof(Types.ObjectId)).optional(),
  result: z.string().min(5).optional(),
  winner: z.instanceof(Types.ObjectId).optional(),
});

export type UpdateBattleDto = z.infer<typeof UpdateBattleDto>;

