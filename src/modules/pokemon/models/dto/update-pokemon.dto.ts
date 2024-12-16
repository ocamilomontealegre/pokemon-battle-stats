import z from "zod";

export const UpdatePokemonDto = z.object({
  type: z.string().min(3).optional(),
  level: z.coerce.number().min(1).max(100).optional(),
  healthPoints: z.coerce.number().min(0).max(300).optional(),
  attack: z.coerce.number().min(0).max(200).optional(),
  defense: z.coerce.number().min(0).max(200).optional(),
});

export type UpdatePokemonDto = z.infer<typeof UpdatePokemonDto>;

