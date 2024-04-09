import { SignupSchema } from "@/schemas";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const validatedData = SignupSchema.safeParse(body);

  if (!validatedData.success) {
    return NextResponse.json({ error: "Invalid fields" }, { status: 500 });
  }

  return NextResponse.json({ response: "success" }, { status: 200 });
}
