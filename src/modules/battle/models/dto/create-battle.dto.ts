import z from "zod";
import { Types } from "mongoose";

export const CreateBattleDto = z.object({
  participants: z.array(z.instanceof(Types.ObjectId)),
  pokemons: z.array(z.instanceof(Types.ObjectId)),
  result: z.string().min(5),
  winner: z.instanceof(Types.ObjectId),
});

export type CreateBattleDto = z.infer<typeof CreateBattleDto>;

