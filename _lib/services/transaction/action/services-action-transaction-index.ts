import { prisma } from "@/_lib/prisma/prisma-client";

type PostNewTransactionProps = {
  publicId: string;
  initialNominal: number;
  id: string;
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

export const PostNewTransaction = async ({
  publicId,
  initialNominal,
  id,
  nominal,
  images,
  nameTransaction,
  date,
  information,
}: PostNewTransactionProps) => {
  return prisma.$transaction(async (tx) => {
    // ? TRANSACTIONS DB =========
    await tx.$executeRaw`
        INSERT INTO transactions (ref_id, id, name_transaction, information, nominal, created_at)
            VALUES
        ((SELECT id FROM users WHERE public_id = ${publicId}), ${id}, ${nameTransaction}, ${information}, ${nominal} ,${date}::timestamp)`;

    // ? INITIAL SALARY DB
    await tx.$executeRaw`
        INSERT INTO initial_salary (ref_id_user, ref_id_transaction, salary_income, salary_remaining, created_at)
          VALUES
        ((SELECT id FROM users WHERE public_id = ${publicId}), ${id}, ${initialNominal}, ${initialNominal - nominal}, ${date}::timestamp)
      `;

    // * TRANSACTION IMAGES DB
    if (images.length > 0) {
      await Promise.all(
        images.map(
          (i) =>
            tx.$executeRaw`
            INSERT INTO value_transaction_images
              (ref_id, image_id, image_name, image_url, id) 
            VALUES
              (${id}, ${i.imageId}, ${i.imageName}, ${i.imageUrl}, ${i.id})`,
        ),
      );
    }
  });
};

type PostCurrentTransactionProps = {
  publicId: string;
  currentId: string;
  id: string;
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
  currentId,
  id,
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
      WHERE ref_id_user = (SELECT id FROM users WHERE public_id = ${publicId}) AND ref_id_transaction = ${currentId}`;

    // ? TRANSACTIONS DB =========
    await tx.$executeRaw`
        INSERT INTO transactions (ref_id, id, name_transaction, information, nominal, created_at)
            VALUES
        ((SELECT id FROM users WHERE public_id = ${publicId}), ${id}, ${nameTransaction}, ${information}, ${nominal} ,${date}::timestamp)`;

    // * TRANSACTION IMAGES DB
    if (images.length > 0) {
      await Promise.all(
        images.map(
          (i) =>
            tx.$executeRaw`
            INSERT INTO value_transaction_images
              (ref_id, image_id, image_name, image_url, id)
            VALUES
              (${id}, ${i.imageId}, ${i.imageName}, ${i.imageUrl}, ${i.id})`,
        ),
      );
    }
  });
};
