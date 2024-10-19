import { z } from "zod";

const signInForm = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export type SignInDto = z.infer<typeof signInForm>;

export default signInForm;
