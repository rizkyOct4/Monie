import { prisma } from "@/_lib/prisma/prisma-client";
import camelcaseKeys from "camelcase-keys";

// * GET PERIOD TRANSACTION ====================
type GetPeriodTransactionProps = {
  publicId: string;
  month: number;
  year: number;
};
export const GetPeriodTransaction = async ({
  publicId,
  month,
  year,
}: GetPeriodTransactionProps) => {
  const query = await prisma.$queryRaw<{ id: string; initial_name: string }[]>`
        SELECT
          id, initial_name
        FROM initial_salary
          WHERE ref_id_user = (SELECT id FROM users WHERE public_id = ${publicId})
          AND EXTRACT(YEAR FROM created_at) = ${year} AND EXTRACT(MONTH FROM created_at) = ${month}
          AND status != 'FINISH'::"IdStatus"
        `;

  return camelcaseKeys(query);
};

// * GET ID PERIOD TRANSACTION ====================
type GetIdPeriodTransactionProps = {
  publicId: string;
  idPeriod: string;
};
export const GetIdPeriodTransaction = async ({
  publicId,
  idPeriod,
}: GetIdPeriodTransactionProps) => {
  const query = await prisma.$queryRaw<
    {
      salary_income: number;
      salary_remaining: number;
      created_at: Date;
      updated_at: Date;
      status: string;
      insight: {
        totalTransaction: number;
        biggestExpense: {
          date: Date;
          amount: number;
        };
        averageExpense: number;
        amountNominal: number;
        mostExpensiveDay: {
          date: Date;
          amount: number;
        };
      }[];
    }[]
  >`
        SELECT
            s.salary_income,
            s.salary_remaining,
            s.created_at,
            s.updated_at,
            s.status,
            (
                SELECT json_agg(result)
                FROM (
                    SELECT
                        COUNT(*) AS "totalTransaction",
                        (
                          SELECT json_build_object(
                            'date', DATE(created_at),
                            'amount', MAX(nominal)
                          )
                          FROM transactions
                          WHERE ref_id = ${idPeriod}
                          GROUP BY DATE(created_at) 
                          ORDER BY MAX(nominal) DESC
                          LIMIT 1
                        ) AS "biggestExpense",
                        AVG(nominal) AS "averageExpense",
                        SUM(nominal) AS "amountNominal",
                        (
                              SELECT json_build_object(
                                  'date', DATE(created_at),
                                  'amount', SUM(nominal)
                              )
                              FROM transactions
                              WHERE ref_id = ${idPeriod}
                              GROUP BY DATE(created_at) 
                              ORDER BY SUM(nominal) DESC
                              LIMIT 1
                        ) AS "mostExpensiveDay"
                    FROM transactions
                    WHERE ref_id = ${idPeriod}
                ) result
            ) AS insight
        FROM initial_salary s
        WHERE
            s.ref_id_user = (
                SELECT id
                FROM users
                WHERE public_id = ${publicId}
            )
        AND s.id = ${idPeriod};
        `;

  return camelcaseKeys(query);
};
