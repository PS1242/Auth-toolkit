import { SignupSchema } from "@/schemas";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prismaclient";
import { generateVerificationToken } from "@/lib/verification-token";
import { getUserByEmail } from "@/lib/users";
import { sendVerificationEmail } from "@/lib/mail";

const SALT_ROUNDS = 10;

export async function POST(req: Request) {
  const body = await req.json();
  const validatedFields = SignupSchema.safeParse(body);

  if (!validatedFields.success) {
    return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
  }

  const { name, email, password } = validatedFields.data;

  const userFound = await getUserByEmail(email);

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

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return NextResponse.json(
    { response: "Confirmation email sent!" },
    { status: 200 }
  );
}
