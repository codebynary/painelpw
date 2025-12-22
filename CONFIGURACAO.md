# 🎮 Guia de Configuração - Painel PW

## ✅ Status da Instalação

- [x] Repositório clonado com sucesso
- [x] Dependências instaladas (462 pacotes)
- [x] Arquivo `.env` criado
- [ ] Banco de dados configurado
- [ ] reCAPTCHA configurado
- [ ] Projeto em execução

---

## 📋 Configurações Necessárias

### 1. Banco de Dados MySQL/MariaDB

Edite o arquivo `.env` e configure a conexão com seu banco de dados:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
```

**Exemplo para Perfect World:**
```env
DATABASE_URL="mysql://root:senha@localhost:3306/new_pw"
```

### 2. Tipo de Hash de Senha

O projeto suporta dois tipos de hash:

```env
HASH_TYPE=base64  # ou md5
```

- **base64**: Codificação Base64 (padrão do PW)
- **md5**: Hash MD5

### 3. Google reCAPTCHA v3

Para proteção contra bots, você precisa configurar o reCAPTCHA:

1. Acesse: https://www.google.com/recaptcha/admin
2. Crie um novo site (reCAPTCHA v3)
3. Adicione as chaves no `.env`:

```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=sua_chave_publica_aqui
RECAPTCHA_SECRET_KEY=sua_chave_secreta_aqui
```

> **Nota:** Se quiser testar sem reCAPTCHA inicialmente, você pode deixar essas chaves vazias, mas precisará ajustar o código.

---

## 🗄️ Configuração do Banco de Dados

### Passo 1: Gerar o Cliente Prisma

```bash
npx prisma generate
```

### Passo 2: Criar as Tabelas

```bash
npx prisma migrate dev --name init
```

Ou se preferir apenas sincronizar o schema:

```bash
npx prisma db push
```

---

## 🚀 Executar o Projeto

### Modo Desenvolvimento

```bash
npm run dev
```

Acesse: **http://localhost:3000**

### Build para Produção

```bash
npm run build
npm run start
```

---

## 📁 Estrutura do Banco de Dados

O projeto usa o seguinte schema (arquivo `prisma/schema.prisma`):

```prisma
model users {
  ID    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

> **⚠️ Importante:** Este schema é básico. Você provavelmente precisará adaptá-lo para o schema do Perfect World, que geralmente inclui campos como `passwd`, `truename`, `prompt`, etc.

---

## 🔧 Próximos Passos Recomendados

1. **Configurar o banco de dados** - Ajustar a `DATABASE_URL` no `.env`
2. **Adaptar o schema Prisma** - Modificar `prisma/schema.prisma` para corresponder ao schema do PW
3. **Configurar reCAPTCHA** - Obter as chaves do Google
4. **Testar o registro** - Executar o projeto e testar a página de cadastro
5. **Personalizar o design** - Ajustar cores, logos e textos conforme seu servidor

---

## 🎨 Personalização

O projeto usa **Tailwind CSS** com um tema gaming minimalista. Os principais arquivos para personalização são:

- `src/app/globals.css` - Estilos globais
- `src/components/RegisterForm.tsx` - Formulário de registro
- `src/assets/img/bg.webp` - Imagem de fundo

---

## 📚 Recursos Úteis

- 📺 [Video Aula Original](https://youtu.be/81ypFlNZ4t4)
- 📖 [Documentação Next.js](https://nextjs.org/docs)
- 🗄️ [Documentação Prisma](https://www.prisma.io/docs)
- 🎨 [Documentação Tailwind CSS](https://tailwindcss.com/docs)
- 🔐 [Google reCAPTCHA](https://www.google.com/recaptcha)

---

## ❓ Precisa de Ajuda?

Se tiver dúvidas sobre:
- Configuração do banco de dados
- Adaptação do schema para Perfect World
- Personalização do design
- Integração com seu servidor

Estou aqui para ajudar! 🚀
