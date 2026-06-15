import { prisma } from "@/_lib/prisma/prisma-client";
import bcrypt from "bcrypt";
import camelcaseKeys from "camelcase-keys";
import { nanoid } from "nanoid";

export const OAuthRegister = async ({
  firstName,
  lastName,
  email,
  password,
  role,
  fullname,
  imageUrl,
  createdAt,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password?: string | undefined;
  role?: string | undefined;
  fullname?: string | undefined;
  imageUrl?: string | undefined;
  createdAt?: Date;
}) => {
  const publicId = nanoid(8);
  // * OAuth
  await prisma.$executeRaw`
        INSERT INTO users (name, email, image_url, public_id, created_at)
        VALUES (${fullname}, ${email}, ${imageUrl}, ${publicId}, ${createdAt}::timestamp)`;

  const result = await prisma.$queryRaw<any>`
      SELECT name, created_at, public_id, image_url
      FROM users WHERE email = ${email}`;

  return camelcaseKeys(result);
};

// export const OAuthRegister = async ({
//   firstName,
//   lastName,
//   email,
//   password,
//   role,
//   fullname,
//   imageUrl,
//   createdAt,
// }: {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password?: string | undefined;
//   role?: string | undefined;
//   fullname?: string | undefined;
//   imageUrl?: string | undefined;
//   createdAt?: Date;
// }) => {
//   const queryCheck = await prisma.$queryRaw<{ email: string }[]>`
//       SELECT email from users WHERE email = ${email}
//     `;
//   const publicId = nanoid(8);

//   if (queryCheck.length < 1) {
//     // * Credential
//     prisma.$transaction(async (tx: { $executeRaw: any; }) => {
//       if (password) {
//         const salt = await bcrypt.genSalt(10);
//         const passwordHash = await bcrypt.hash(password, salt);

//         await tx.$executeRaw`
//         INSERT INTO users (first_name, last_name, email, password, role, public_id)
//         VALUES (${firstName}, ${lastName}, ${email}, ${passwordHash}, ${role}::role_user, ${publicId})`;
//       } else {
//         // * OAuth
//         await tx.$executeRaw`
//         INSERT INTO users (name, email, image_url, public_id, created_at)
//         VALUES (${fullname}, ${email}, ${imageUrl}, ${publicId}, ${createdAt}::timestamp)`;
//       }
//     });
//   }

//   const result = await prisma.$queryRaw<any>`
//       SELECT name, created_at, public_id, image_url
//       FROM users WHERE email = ${email}`;

//   return camelcaseKeys(result);
// };
