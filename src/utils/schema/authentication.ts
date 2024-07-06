import z from "zod";

export const loginSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8),
});

export const signUpSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export type User = z.infer<typeof loginSchema>;
