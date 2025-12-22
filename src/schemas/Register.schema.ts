import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(4, { message: "Nome é obrigatório" })
  // o name precisar ter apenas caracteres minusculos e numeros
  .regex(/^[a-z0-9]+$/, { message: "Nome deve conter apenas letras minúsculas e números" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "A senha deve conter pelo menos 6 caracteres" }),
  confirmPassword: z.string().min(6, { message: "A senha deve conter pelo menos 6 caracteres" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"],
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;