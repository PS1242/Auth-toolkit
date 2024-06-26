import prisma from "./prismaclient";
import { v4 as uuid } from "uuid";

export async function getVerificationTokenByEmail(email: string) {
  try {
    const foundToken = prisma.verificationToken.findFirst({
      where: {
        email,
      },
    });
    return foundToken;
  } catch (error) {
    return null;
  }
}

export async function getVerificationTokenByToken(token: string) {
  try {
    const foundToken = prisma.verificationToken.findUnique({
      where: {
        token,
      },
    });
    return foundToken;
  } catch (error) {
    return null;
  }
}

export async function generateVerificationToken(email: string) {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  // remove the existing token if present
  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
}
