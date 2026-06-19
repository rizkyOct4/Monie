import { prisma } from "@/_lib/prisma/prisma-client";
import camelcaseKeys from "camelcase-keys";
import { nanoid } from "nanoid";

type PostTransactionProps = {
  id: string;
  nominal: number;
  images:
    | {
        id: string;
        imageName: string;
        imageId: any;
        imageUrl: any;
      }[]
    | [];
  nameTransaction: string;
  date: Date;
  information?: string | undefined;
};

export const PostTransaction = async ({
  id,
  nominal,
  images,
  nameTransaction,
  date,
  information,
}: PostTransactionProps) => {
  return prisma.$transaction(async (tx) => {
    // ? TRANSACTION_DB =========
    await tx.$executeRaw`
        INSERT INTO transactions (id, name_transaction, created_at)
            VALUES
        (${id}, ${nameTransaction}, ${date}::date)`;

    // ? VALUE TRANSACTION_DB =========
    await tx.$executeRaw`
        INSERT INTO value_transaction (ref_id, information, nominal, created_at)
        VALUES
        (${id}, ${information}, ${nominal}, ${date}::date)`;

    // ! PROJECT_TEXT_DESCRITION DB
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
