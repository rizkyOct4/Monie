import { prisma } from "@/_lib/prisma/prisma-client";

type PostNewTransactionProps = {
  publicId: string;
  initialNominal: number;
  id: string;
  nameTransaction: string;
  date: Date;
};

export const PostNewTransaction = async ({
  publicId,
  id,
  initialNominal,
  nameTransaction,
  date,
}: PostNewTransactionProps) => {
  return prisma.$transaction(async (tx) => {
    // ? INITIAL SALARY DB
    await tx.$executeRaw`
        INSERT INTO initial_salary (ref_id_user, id, initial_name, salary_income, salary_remaining, created_at, updated_at)
          VALUES
        ((SELECT id FROM users WHERE public_id = ${publicId}), ${id}, ${nameTransaction}, ${initialNominal}, ${initialNominal} ,${date}::timestamp, ${date}::timestamp)
      `;
  });
};

type PostCurrentTransactionProps = {
  publicId: string;
  id: string;
  existId: string;
  nominal: number;
  images:
    | {
        id: string;
        imageName: string;
        imageId: string;
        imageUrl: string;
      }[]
    | [];
  nameTransaction: string;
  date: Date;
  information?: string | undefined;
};

export const PostCurrentTransaction = async ({
  publicId,
  id,
  existId,
  nominal,
  images,
  nameTransaction,
  date,
  information,
}: PostCurrentTransactionProps) => {
  return prisma.$transaction(async (tx) => {

    await tx.$executeRaw`
      UPDATE initial_salary
        SET salary_remaining = salary_remaining - ${nominal}, updated_at = ${date}::timestamp
      WHERE ref_id_user = (SELECT id FROM users WHERE public_id = ${publicId}) AND id = ${existId}`;

    // ? TRANSACTIONS DB =========
    await tx.$executeRaw`
        INSERT INTO transactions (id, ref_id_user, ref_id, name_transaction, information, nominal, created_at, updated_at)
            VALUES
        (${id} ,(SELECT id FROM users WHERE public_id = ${publicId}), ${existId}, ${nameTransaction}, ${information}, ${nominal} ,${date}::timestamp, ${date}::timestamp)`;

    // * TRANSACTION IMAGES DB
    if (images.length > 0) {
      await Promise.all(
        images.map(
          (i) =>
            tx.$executeRaw`
            INSERT INTO transaction_images
              (ref_id, image_id, image_name, image_url, id)
            VALUES
              (${id}, ${i.imageId}, ${i.imageName}, ${i.imageUrl}, ${i.id})`,
        ),
      );
    }
  });
};
