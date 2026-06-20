import { prisma } from "@/_lib/prisma/prisma-client";
import camelcaseKeys from "camelcase-keys";

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
  SELECT id, information, nominal, created_at, updated_at
  FROM transactions
  WHERE created_at::date = ${searchTransaction}::date
    AND ref_id = (SELECT id FROM users WHERE public_id = ${publicId})
`;

  if (!query) return [];

  const queryMore = await prisma.$queryRaw<{ amount_transaction: number }[]>`
  SELECT COALESCE(COUNT(created_at), 0)::int AS amount_transaction
  FROM transactions
  WHERE created_at::date = ${searchTransaction}::date
    AND ref_id = (SELECT id FROM users WHERE public_id = ${publicId})
`;

  const data = camelcaseKeys(query);
  const hasMore = Number(queryMore[0].amount_transaction) > limit + offset;

  return { data, hasMore };
};
