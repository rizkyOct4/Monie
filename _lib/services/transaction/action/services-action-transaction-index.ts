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

// * DELETE TRANSACTION ==============
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

type PutTransactionProps = {
  publicId: string;
  existId: string;
  date: Date;
  lastNominal: number;
  nominal: number;
  images: string[];
  information: string;
  newImages:
    | {
        id: string;
        imageName: string;
        imageId: string;
        imageUrl: string;
      }[]
    | [];
  deleteImages: string[];
  wrongDate: boolean;
};
export const PutTransaction = async ({
  publicId,
  existId,
  date,
  lastNominal,
  nominal,
  images,
  information,
  newImages,
  deleteImages,
  wrongDate,
}: PutTransactionProps) => {
  return prisma.$transaction(async (tx) => {
    // ? UPDATE TRANSACTION ============
    // ! CHECK NOMINAL
    if (lastNominal > nominal) {
      const nominalFix = lastNominal - nominal;

      // ? UPDATE INTIAL SALARY ============
      await tx.$executeRaw`
        UPDATE initial_salary
          SET salary_remaining = salary_remaining + ${nominalFix}, updated_at = ${date}::timestamp
        WHERE id = (SELECT ref_id FROM transactions WHERE id = ${existId}) AND ref_id_user = (SELECT id FROM users WHERE public_id = ${publicId})
      `;
    } else {
      const nominalFix = nominal - lastNominal;

      // ? UPDATE INTIAL SALARY ============
      await tx.$executeRaw`
        UPDATE initial_salary
          SET salary_remaining = salary_remaining - ${nominalFix}, updated_at = ${date}::timestamp
        WHERE id = (SELECT ref_id FROM transactions WHERE id = ${existId}) AND ref_id_user = (SELECT id FROM users WHERE public_id = ${publicId})
      `;
    }

    if (wrongDate) {
      await tx.$executeRaw`
        UPDATE transactions
          SET information = ${information}, nominal = ${nominal}, created_at = ${date}::timestamp, updated_at = ${date}::timestamp
        WHERE id = ${existId}`;
    } else {
      await tx.$executeRaw`
        UPDATE transactions
          SET information = ${information}, nominal = ${nominal}, updated_at = ${date}::timestamp
        WHERE id = ${existId}`;
    }

    // ? CHECK IMAGES DELETED ===========
    if (deleteImages.length > 0) {
      await Promise.all(
        deleteImages.map(
          (i) => tx.$executeRaw`
          DELETE FROM transaction_images
          WHERE image_name = ${i}
        `,
        ),
      );
    }

    // ? CHECK NEW IMAGES ===========
    if (newImages.length > 0) {
      await Promise.all(
        newImages.map(
          (i) => tx.$executeRaw`
      INSERT INTO transaction_images (ref_id, id, image_id, image_name, image_url)
        VALUES
      (${existId}, ${i.id}, ${i.imageId}, ${i.imageName}, ${i.imageUrl})
      `,
        ),
      );
    }
  });
};

// * DELETE TRANSACTION ==============
type DeleteTransactionProps = {
  publicId: string;
  refId: string;
  id: string;
  nominal: number;
};
export const DeleteTransaction = async ({
  publicId,
  refId,
  id,
  nominal,
}: DeleteTransactionProps) => {
  return prisma.$transaction(async (tx) => {
    // ? UPDATE INITIAL TRANSACTION ========
    await tx.$executeRaw`
      UPDATE initial_salary
        SET salary_remaining = salary_remaining + ${nominal}
      WHERE ref_id_user = (SELECT id FROM users WHERE public_id = ${publicId}) AND id = ${refId}
    `;

    // ! DELETE TRANSACTION ========
    await tx.$executeRaw`
      DELETE FROM transactions
      WHERE id = ${id}
    `;

    // ! DELETE TRANSACTION IMAGES ========
    await tx.$executeRaw`
      DELETE FROM transaction_images 
      WHERE ref_id = ${id}
    `;
  });
};

// todo DIKIT LAGI UNTUK TRANSACTION INI !!!
