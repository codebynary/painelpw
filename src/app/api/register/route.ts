import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { name, email, password, recaptchaToken } = await request.json();
    if (!name || !email || !password || !recaptchaToken) {
      return NextResponse.json({ error: "Campos obrigatórios não preenchidos" }, { status: 400 });
    }

    if(!recaptchaToken) {
      return NextResponse.json({ error: "Recaptcha token é obrigatório" }, { status: 400 });
    }

    const recaptchaSuccess = await verifyRecaptcha(recaptchaToken);
    console.log('Recaptcha verificado:');
    if(!recaptchaSuccess) {
      console.log('Recaptcha falhou');
      return NextResponse.json({ error: "Recaptcha falhou" }, { status: 400 });
    }

    // o name precisar ter apenas caracteres minusculos e numeros
    if(name.length < 4) {
      return NextResponse.json({ error: "O nome deve conter pelo menos 4 caracteres" }, { status: 400 });
    }

    if(!/^[a-z0-9]+$/.test(name)) {
      return NextResponse.json({ error: "O nome deve conter apenas letras minúsculas e números" }, { status: 400 });
    }
    // o email precisar ser um email valido
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }
    // a senha precisar ser uma senha valida
    if(password.length < 6) {
      return NextResponse.json({ error: "A senha deve conter pelo menos 6 caracteres" }, { status: 400 });
    }

    const userExists = await prisma.users.findFirst({
      where: {
        OR: [
          { name },
          { email },
        ],
      },
    });

    if(userExists) {
      return NextResponse.json({ error: "Usuário já existe" }, { status: 400 });
    }

    await createUser(name, email, password)

    return NextResponse.json({ message: "Usuário criado com sucesso" }, { status: 201 });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


function hashPassword(name: string, password: string) {
  const hashType = process.env.HASH_TYPE || 'base64'

  const hash = crypto.createHash('md5')
  hash.update(name + password)

  const hashedPassword = hashType === 'md5' 
  ? "0x" + hash.digest('hex')
  : hash.digest('base64')

  return hashedPassword
}

async function createUser(name: string, email: string, password: string) {
  const hashedPassword = hashPassword(name, password)

  try {
    await prisma.$executeRawUnsafe(
      `CALL adduser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      name,           // name1
      hashedPassword,       // passwd1
      '',           // prompt1
      '',           // answer1
      '',           // truename1
      '',           // idnumber1
      email,          // email1
      '',           // mobilenumber1
      '',           // province1
      '',           // city1
      '',           // phonenumber1
      '',           // address1
      '',           // postalcode1
      null,           // gender1
      null,           // birthday1
      '',           // qq1
      hashedPassword  // passwd21
    );
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erro ao criar usuário" }
  }
}


async function verifyRecaptcha(recaptchaToken: string) {
  try {
    console.log('Verificando Recaptcha');
    const secretKey = process.env.RECAPTCHA_SECRET_KEY as string;

    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`, { method: 'POST' });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error(error);
    return false;
  }
}