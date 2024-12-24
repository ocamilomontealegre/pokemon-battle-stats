import z from "zod";

const ParticipanDto = z.object({
  id: z.string().min(24),
  pokemon: z.string().min(24),
});

export const CreateBattleDto = z.object({
  participants: z.array(ParticipanDto).min(2),
});

export type CreateBattleDto = z.infer<typeof CreateBattleDto>;

