import { NextResponse } from "next/server";

const delay = (time = 1000) => {
  return new Promise((res) => {
    setTimeout(() => {
      res("done");
    }, time);
  });
};

export async function POST(req: Request) {
  const body = await req.json();

  await delay(1000);

  return NextResponse.json({ response: "success" }, { status: 200 });
}
