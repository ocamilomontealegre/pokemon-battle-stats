import z from "zod";

export const CreatePokemonDto = z.object({
  name: z.string().min(2),
  type: z.string().min(3),
  level: z.coerce.number().min(1).max(100),
  healthPoints: z.coerce.number().min(0).max(300),
  attack: z.coerce.number().min(0).max(200),
  defense: z.coerce.number().min(0).max(200),
});

export type CreatePokemonDto = z.infer<typeof CreatePokemonDto>;

