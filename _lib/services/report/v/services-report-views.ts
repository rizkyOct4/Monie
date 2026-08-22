import { prisma } from "@/_lib/prisma/prisma-client";
import camelcaseKeys from "camelcase-keys";

type TGETTotalTransactions = {
  publicId: string;
  nameTransaction: string;
  limit: number;
  offset: number;
};

export const GETVTotalTransactions = async ({
  publicId,
  nameTransaction,
  limit,
  offset,
}: TGETTotalTransactions) => {
  const query = await prisma.$queryRaw<any>`
        SELECT
            DATE(created_at) AS date,
            json_agg(
                json_build_object(
                    'id', id,
                    'nameTransaction', name_transaction,
                    'information', information,
                    'nominal', nominal,
                    'createdAt', created_at,
                    'updatedAt', updated_at,
                    'status', status,
                    'transactionModel', transaction_model
                )
                ORDER BY created_at DESC
            ) AS transactions
        FROM transactions
        WHERE ref_id_user = (SELECT id FROM users WHERE public_id = ${publicId})
            AND name_transaction = ${nameTransaction}
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at) DESC
        LIMIT ${limit}
        OFFSET ${offset}
    `;

  const queryMore = await prisma.$queryRaw<{ amount_date: number }[]>`
        SELECT
            COALESCE(COUNT(created_at), 0) AS amount_date
        FROM transactions
            WHERE ref_id_user = (SELECT id FROM users WHERE public_id = ${publicId})
            AND name_transaction = ${nameTransaction}
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at) DESC
    `;

  const data = camelcaseKeys(query);
  const hasMore = Number(queryMore[0].amount_date) > limit + offset;

  return { data, hasMore };
};
