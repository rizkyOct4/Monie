import { prisma } from "@/_lib/prisma/prisma-client";
import bcrypt from "bcrypt";
import camelcaseKeys from "camelcase-keys";
import { nanoid } from "nanoid";

// * OAuth =================
export const OAuthRegister = async ({
  firstName,
  lastName,
  email,
  fullname,
  imageUrl,
  createdAt,
}: {
  firstName: string;
  lastName: string;
  email: string;
  fullname?: string | undefined;
  imageUrl?: string | undefined;
  createdAt?: Date;
}) => {
  const queryCheck = await prisma.$queryRaw<{ email: string }[]>`
        SELECT email FROM users WHERE email = ${email}
      `;

  const publicId = nanoid(8);

  if (queryCheck.length < 1) {
    prisma.$transaction(async (tx) => {
      // * OAuth
      await tx.$executeRaw`
        INSERT INTO users (name, email, image_url, public_id, created_at, user_type)
          VALUES 
        (${fullname}, ${email}, ${imageUrl}, ${publicId}, ${createdAt}::timestamp, "REGULAR"::"UserType")`;
    });
  }

  const result = await prisma.$queryRaw<
    { created_at: Date; public_id: string; image_url: string }[]
  >`
      SELECT created_at, public_id, image_url
      FROM users WHERE email = ${email}`;

  return camelcaseKeys(result);
};

// * Credential ============
export const CredentialRegister = async ({
  name,
  email,
  password,
  userType,
}: {
  name: string;
  email: string;
  password: string;
  userType: string;
}) => {
  return prisma.$transaction(async (tx) => {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const publicId = nanoid(8);

    await tx.$executeRaw`
      INSERT INTO users (public_id, name, email, password, user_type) 
        VALUES 
      (${publicId}, ${name}, ${email}, ${passwordHash}, ${userType}::"UserType")`;
  });
};

export const CredentialsLogin = async ({
  email,
  password,
}: {
  email: any;
  password: any;
}) => {
  const userCheck: any[] = await prisma.$queryRaw`
    SELECT public_id, email, password, name, created_at 
    FROM users
    WHERE email = ${email}`;

  const passwordMatch = await bcrypt.compare(password, userCheck[0].password);

  if (userCheck.length === 0) {
    throw new Error("Invalid email or password");
  }
  if (!passwordMatch) {
    throw new Error("Invalid password");
  }

  const rawData = {
    publicId: userCheck[0].public_id,
    email: userCheck[0].email,
    name: userCheck[0].name,
    createdAt: userCheck[0].created_at,
  };

  return {
    success: true,
    user: camelcaseKeys(rawData),
  };
};
