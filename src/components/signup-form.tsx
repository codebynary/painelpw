'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterSchema, RegisterSchemaType } from "@/schemas/Register.schema";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useState } from "react";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });

  async function onSubmit(data: RegisterSchemaType) {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    if(!executeRecaptcha) {
      setError('Recaptcha não carregado');
      setIsLoading(false);
      return;
    }
    const recaptchaToken = await executeRecaptcha('register');
    if(!recaptchaToken) {
      setError('Recaptcha token é obrigatório');
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...data, recaptchaToken}),
      });
      if(!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        setError(errorData.message || 'Erro ao criar usuário');
        setIsLoading(false);
        return;
      }
      const responseData = await response.json();
      setSuccess(true);
      setIsLoading(false);
      console.log(responseData);
    } catch (error) {
      console.error(error);
      setError('Erro ao criar usuário');
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Criar sua conta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Preencha o formulário abaixo para criar sua conta
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Nome completo</FieldLabel>
          <Input id="name" type="text" placeholder="John Doe" {...register("name")} />
          {errors.name && (
            <FieldDescription className="text-red-500">
              {errors.name.message}
            </FieldDescription>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" {...register("email")} />
          {errors.email && (
            <FieldDescription className="text-red-500">
              {errors.email.message}
            </FieldDescription>
          )}
          <FieldDescription>
            Usaremos este email para contatá-lo. Não compartilharemos seu email
            com ninguém.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <FieldDescription className="text-red-500">
              {errors.password.message}
            </FieldDescription>
          )}
          <FieldDescription>
            Deve conter pelo menos 8 caracteres.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirmar Senha</FieldLabel>
          <Input id="confirm-password" type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <FieldDescription className="text-red-500">
              {errors.confirmPassword.message}
            </FieldDescription>
          )}
          <FieldDescription>Confirme sua senha.</FieldDescription>
        </Field>
        <Field>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Criando conta...' : 'Criar Conta'}
          </Button>
          {error && (
            <FieldDescription className="text-red-500 text-center mt-2">
              {error}
            </FieldDescription>
          )}
          {success && (
            <FieldDescription className="text-green-500 text-center mt-2">
              Conta criada com sucesso!
            </FieldDescription>
          )}
        </Field>
        <FieldSeparator>Ou continue com</FieldSeparator>
        <Field>
          <Button variant="outline" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            Criar conta com GitHub
          </Button>
          <FieldDescription className="px-6 text-center">
            Já tem uma conta? <a href="#">Entrar</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
