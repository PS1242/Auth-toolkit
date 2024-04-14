import { SignupSchema } from "@/schemas";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prismaclient";

const SALT_ROUNDS = 10;

export async function POST(req: Request) {
  const body = await req.json();
  const validatedFields = SignupSchema.safeParse(body);

  if (!validatedFields.success) {
    return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
  }

  const { name, email, password } = validatedFields.data;

  const userFound = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // user with this email already exists
  if (userFound) {
    return NextResponse.json(
      { error: "Email already in use!" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ response: "User created!" }, { status: 200 });
}
