import z from "zod";

export const UpdateTrainerDto = z.object({
  name: z.string().min(3).trim().optional(),
  age: z.number().min(0).optional(),
  region: z.string().min(3).trim().optional(),
});
export type UpdateTrainerDto = z.infer<typeof UpdateTrainerDto>;

