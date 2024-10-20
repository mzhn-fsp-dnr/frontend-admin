import { z } from "@/lib/zod";

const email = z.string() // login

const password = z
  .string()
  .min(4, { message: 'Пароль должен быть длиной от 4 символов' });

const signInForm = z.object({
  email,
  password,
});

export type SignInDto = z.infer<typeof signInForm>;

export default signInForm;
