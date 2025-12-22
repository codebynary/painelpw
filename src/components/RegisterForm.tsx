'use client'
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterSchemaType } from "@/schemas/Register.schema";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useState } from "react";

export const RegisterForm = () => {
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
    <div className="w-full max-w-md mx-auto">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="relative bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border-2 border-cyan-500/30 rounded-lg p-8 shadow-[0_0_30px_rgba(6,182,212,0.1)]"
      >
        {/* Título estilo gaming */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-cyan-400 tracking-wider uppercase mb-2">
            Criar Conta
          </h2>
          <div className="h-0.5 w-20 mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <Label 
              htmlFor="name" 
              className="text-cyan-300 font-semibold text-sm tracking-wide uppercase"
            >
              Nome
            </Label>
            <Input 
              id="name" 
              {...register("name")} 
              className="bg-zinc-900/50 border-cyan-500/30 text-white placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-cyan-400/20 focus:ring-2 rounded-none"
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1 font-mono">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label 
              htmlFor="email" 
              className="text-cyan-300 font-semibold text-sm tracking-wide uppercase"
            >
              Email
            </Label>
            <Input 
              id="email" 
              {...register("email")} 
              className="bg-zinc-900/50 border-cyan-500/30 text-white placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-cyan-400/20 focus:ring-2 rounded-none"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1 font-mono">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label 
              htmlFor="password" 
              className="text-cyan-300 font-semibold text-sm tracking-wide uppercase"
            >
              Senha
            </Label>
            <Input 
              id="password" 
              type="password" 
              {...register("password")} 
              className="bg-zinc-900/50 border-cyan-500/30 text-white placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-cyan-400/20 focus:ring-2 rounded-none"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1 font-mono">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label 
              htmlFor="confirmPassword" 
              className="text-cyan-300 font-semibold text-sm tracking-wide uppercase"
            >
              Confirmar Senha
            </Label>
            <Input 
              id="confirmPassword" 
              type="password" 
              {...register("confirmPassword")} 
              className="bg-zinc-900/50 border-cyan-500/30 text-white placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-cyan-400/20 focus:ring-2 rounded-none"
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1 font-mono">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full mt-8 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-bold py-3 rounded-none border-2 border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.3)] uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed" 
            disabled={isLoading}
          >
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </Button>

          {error && (
            <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-none">
              <p className="text-red-400 text-sm font-mono">{error}</p>
            </div>
          )}

          {success && (
            <div className="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded-none">
              <p className="text-green-400 text-sm font-mono">Usuário criado com sucesso!</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};