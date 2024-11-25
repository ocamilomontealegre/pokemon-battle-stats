import z from "zod";

export const CreateTreanerDto = z.object({
  name: z.string().min(3).trim(),
  age: z.number().min(1),
  region: z.string().min(3).trim(),
});
export type CreateTreanerDto = z.infer<typeof CreateTreanerDto>;

