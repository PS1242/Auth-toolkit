import { LoginSchema } from "@/schemas";
import { NextResponse } from "next/server";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";
import { AuthError } from "next-auth";

export async function POST(req: Request) {
  const body = await req.json();
  const validatedFields = LoginSchema.safeParse(body);

  if (!validatedFields.success) {
    return NextResponse.json({ error: "Invalid fields" }, { status: 500 });
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return NextResponse.json({ response: "success" }, { status: 200 });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return NextResponse.json(
            { error: "invalid credentails" },
            { status: 401 }
          );

        default:
          return NextResponse.json(
            { error: "something went wrong" },
            { status: 401 }
          );
      }
    }
    throw error;
  }
}
