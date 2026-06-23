import { prisma } from "@/_lib/prisma/prisma-client";
import camelcaseKeys from "camelcase-keys";

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
  const query = await prisma.$queryRaw`
    SELECT id, initial_name 
      FROM initial_salary
    WHERE ref_id_user = (SELECT id FROM users WHERE public_id = ${publicId})
    ORDER BY updated_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
  `;

  if (!query) return [];

  const queryCheck = await prisma.$queryRaw<{ amount_id: number }[]>`
    SELECT COALESCE(COUNT(id), 0) AS amount_id
      FROM initial_salary
    WHERE ref_id_user = (SELECT id FROM users WHERE public_id = ${publicId})`;

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
  const query = await prisma.$queryRaw`
    SELECT id, initial_name
      FROM initial_salary
    WHERE ref_id_user = (SELECT id FROM users WHERE public_id = ${publicId})
    AND initial_name ILIKE ${`%${search}%`}
    LIMIT 20`;

  if (!query) return [];
  return camelcaseKeys(query);
};

// * TRANSACTION LIST ====================
type GetTransactionListProps = {
  publicId: string;
  searchTransaction: Date | string;
  offset: number;
  limit: number;
};
export const GetTransactionList = async ({
  publicId,
  searchTransaction,
  offset,
  limit,
}: GetTransactionListProps) => {
  const query = await prisma.$queryRaw`
  SELECT id, ref_id, information, nominal, created_at, updated_at
  FROM transactions
  WHERE created_at::date = ${searchTransaction}::date
    AND ref_id_user = (SELECT id FROM users WHERE public_id = ${publicId})
  ORDER BY updated_at DESC`;

  if (!query) return [];

  const queryMore = await prisma.$queryRaw<{ amount_transaction: number }[]>`
  SELECT COALESCE(COUNT(created_at), 0)::int AS amount_transaction
    FROM transactions
  WHERE created_at::date = ${searchTransaction}::date
    AND ref_id_user = (SELECT id FROM users WHERE public_id = ${publicId})
`;

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
    SELECT t.id, t.ref_id, t.name_transaction, t.information, t.nominal, t.updated_at,
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
