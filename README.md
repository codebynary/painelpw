# 🎥 Página de Registro – Video Aula `Perfect World`

**Descrição**

Esta é a página de registro que eu ensinei a criar na minha **video aula** sobre desenvolvimento web com **Next.js** (incluindo estrutura de diretórios e principais arquivos). O projeto mostra como configurar a pasta, criar rotas, e organizar o frontend e backend para a página de registro com estilo gaming minimalista.

---

## 📁 Estrutura de Diretórios

```plaintext
my-app/
├── prisma/                    # Configurações do Prisma (banco de dados)
│   └── schema.prisma          # Schema do banco de dados
├── public/                    # Arquivos estáticos públicos
│   └── *.svg                  # Ícones e imagens estáticas
├── src/
│   ├── app/                   # Páginas e rotas do Next.js
│   │   ├── api/
│   │   │   └── register/      # API route para registro
│   │   │       └── route.ts
│   │   ├── signup/            # Página de cadastro
│   │   │   └── page.tsx
│   │   ├── layout.tsx         # Layout principal
│   │   ├── page.tsx           # Página principal
│   │   └── globals.css        # Estilos globais
│   ├── assets/                # Assets do projeto
│   │   └── img/
│   │       └── bg.webp        # Imagem de fundo
│   ├── components/            # Componentes React
│   │   ├── ui/                # Componentes UI (shadcn/ui)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── field.tsx
│   │   │   └── separator.tsx
│   │   ├── RegisterForm.tsx   # Formulário de registro
│   │   ├── signup-form.tsx     # Formulário alternativo
│   │   └── RecaptchaProvider.tsx # Provider do reCAPTCHA
│   ├── lib/                   # Utilitários e configurações
│   │   ├── prisma.ts          # Cliente Prisma
│   │   └── utils.ts           # Funções utilitárias
│   └── schemas/               # Schemas de validação
│       └── Register.schema.ts # Schema Zod para registro
├── .env.example               # Exemplo de variáveis de ambiente
├── .gitignore                 # Define arquivos ignorados
├── next.config.ts             # Configuração do Next.js
├── package.json               # Dependências e scripts do projeto
├── tsconfig.json              # Configuração do TypeScript
└── README.md                  # Este arquivo
```

---

## 🚀 Instalação e Como Rodar

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/kaiquebsl/pagina-registro-pw-video-aula.git
   ```

2. **Entre na pasta do projeto:**

   ```bash
   cd pagina-registro-pw-video-aula
   ```

3. **Instale as dependências:**

   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

4. **Configure as variáveis de ambiente:**

   Copie o arquivo `.env.example` para `.env` e ajuste as variáveis:
   
   ```bash
   cp .env.example .env
   ```
   
   Configure as seguintes variáveis no arquivo `.env`:
   - `DATABASE_URL` - URL de conexão com o banco de dados
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - Chave pública do Google reCAPTCHA
   - `RECAPTCHA_SECRET_KEY` - Chave secreta do Google reCAPTCHA

5. **Configure o banco de dados:**

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

6. **Rode o servidor de desenvolvimento:**

   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

7. **Abra no navegador:**

   ```
   http://localhost:3000
   ```

---

## 📌 Tecnologias Usadas

* **Next.js 16** — Framework React para páginas e rotas
* **React 19** — Biblioteca JavaScript para interfaces
* **TypeScript** — Tipagem estática
* **Prisma** — ORM para banco de dados
* **Tailwind CSS** — Framework CSS utilitário
* **Zod** — Validação de schemas TypeScript-first
* **React Hook Form** — Gerenciamento de formulários
* **Google reCAPTCHA v3** — Proteção contra bots
* **shadcn/ui** — Componentes UI reutilizáveis
* **Radix UI** — Componentes primitivos acessíveis

---

## 🎮 Características

* ✨ **Design Gaming Minimalista** — Interface com estilo gaming, cores escuras e bordas ciano com glow sutil
* 🔒 **Validação Completa** — Validação de formulário com Zod e React Hook Form
* 🤖 **Proteção reCAPTCHA** — Integração com Google reCAPTCHA v3
* 📱 **Responsivo** — Layout adaptável para diferentes tamanhos de tela
* 🎨 **UI Moderna** — Componentes shadcn/ui com Tailwind CSS
* 🔐 **Segurança** — Criptografia de senhas e validação server-side

---

## 📺 Conteúdo da Video Aula

Assista ao tutorial para acompanhar passo a passo do projeto:

➡️ **[link da sua video aula aqui]**

---

## 👨‍💻 Sobre

Criado por **@kaiquebsl** durante a produção de conteúdo educativo sobre desenvolvimento web.

---

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm run start

# Linter
npm run lint
```

---






---

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.
