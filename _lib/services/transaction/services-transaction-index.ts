import { prisma } from "@/_lib/prisma/prisma-client";
import camelcaseKeys from "camelcase-keys";
import { cacheTag } from "next/cache";

// * ID TRANSACTION ====================
type GetIdTransactionsProps = {
  publicId: string;
  limit: number;
  offset: number;
};
export const GetIdTransactions = async ({
  publicId,
  limit,
  offset,
}: GetIdTransactionsProps) => {
  const query = await prisma.$queryRaw<
    { id: string; initial_name: string; status: string }[]
  >`
    SELECT id, initial_name, status 
      FROM initial_salary
    WHERE ref_id_user = (SELECT id FROM users WHERE public_id = ${publicId}) AND status != 'FINISH'::"IdStatus"
    ORDER BY updated_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
  `;

  const queryCheck = await prisma.$queryRaw<{ amount_id: number }[]>`
    SELECT COALESCE(COUNT(id), 0) AS amount_id
      FROM initial_salary
    WHERE ref_id_user = (SELECT id FROM users WHERE public_id = ${publicId}) AND status != 'FINISH'::"IdStatus"`;

  const data = camelcaseKeys(query);
  const hasMore = Number(queryCheck[0].amount_id) > limit + offset;

  return { data, hasMore };
};

// * SEARCH ID TRANSACTION ====================
type GetSearchIdTransactionsProps = {
  publicId: string;
  search: string;
};
export const GetSearchIdTransactions = async ({
  publicId,
  search,
}: GetSearchIdTransactionsProps) => {
  const query = await prisma.$queryRaw<{ id: string; initial_name: string }[]>`
    SELECT id, initial_name
      FROM initial_salary
    WHERE ref_id_user = (SELECT id FROM users WHERE public_id = ${publicId})
    AND initial_name ILIKE ${`%${search}%`} AND status != 'FINISH'::"IdStatus"
    LIMIT 20`;

  return camelcaseKeys(query);
};

// * TRANSACTION LIST ====================
export type TGetTransactions = {
  status: string;
  id: string;
  ref_id: string;
  information: string;
  nominal: number;
  created_at: Date;
  updated_at: Date;
  images: {
    id: string;
    imageName: string;
    imageUrl: string;
  }[];
};
type GetTransactionListProps = {
  publicId: string;
  transactionName: string | undefined;
  convDate: Date | string;
  offset: number;
  limit: number;
};
export const GetTransactionList = async ({
  publicId,
  transactionName,
  convDate,
  offset,
  limit,
}: GetTransactionListProps) => {
  // "use cache"

  // cacheTag(`transactions:${publicId}`);

  const query = await prisma.$queryRaw<TGetTransactions[]>`
  SELECT s.status, t.id, t.ref_id, t.information, t.nominal, t.created_at, t.updated_at,
   COALESCE(
      (
        SELECT json_agg(
          json_build_object(
            'id', ti.id,
            'imageName', ti.image_name,
            'imageUrl', ti.image_url
          )
        )
        FROM transaction_images ti
        WHERE ti.ref_id = t.id
      ),
      '[]'::json
    ) AS images
    FROM transactions t
  JOIN initial_salary s ON s.id = t.ref_id
  WHERE t.created_at::date = ${convDate}::date
    AND t.ref_id_user = (SELECT id FROM users WHERE public_id = ${publicId})
    AND s.initial_name = ${transactionName}
    ORDER BY t.updated_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
  `;

  const queryMore = await prisma.$queryRaw<{ amount_transaction: number }[]>`
    SELECT COALESCE(COUNT(t.created_at), 0)::int AS amount_transaction
      FROM transactions t
    JOIN initial_salary s ON s.id = t.ref_id
    WHERE t.created_at::date = ${convDate}::date
      AND t.ref_id_user = (SELECT id FROM users WHERE public_id = ${publicId})
      AND s.initial_name = ${transactionName}`;

  const data = camelcaseKeys(query);
  const hasMore = Number(queryMore[0].amount_transaction) > limit + offset;

  return { data, hasMore };
};

// * GET PUT ID TRANSACTION ====================
type PutTransactionTypes = {
  id: string;
  ref_id: string;
  name_transaction: string;
  information: string;
  nominal: number;
  updated_at: Date;
  images:
    | {
        id: string;
        image_name: string;
        image_url: string;
      }[]
    | [];
};
type GetPutIdTransactionsProps = {
  publicId: string;
  idTransaction: string;
};
export const GetPutIdTransactions = async ({
  publicId,
  idTransaction,
}: GetPutIdTransactionsProps) => {
  const query = await prisma.$queryRaw<PutTransactionTypes[]>`
    SELECT t.ref_id, t.name_transaction, t.information, t.nominal, t.updated_at,
      COALESCE(
      (
        SELECT json_agg(
          json_build_object(
            'id', ti.id,
            'imageName', ti.image_name,
            'imageUrl', ti.image_url
          )
        )
        FROM transaction_images ti
        WHERE ti.ref_id = t.id
      ),
      '[]'::json
    ) AS images
      FROM transactions t
    WHERE ref_id_user = (SELECT id FROM users WHERE public_id = ${publicId}) AND id = ${idTransaction}`;

  return camelcaseKeys(query);
};
