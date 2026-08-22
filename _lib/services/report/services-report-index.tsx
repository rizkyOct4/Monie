import { prisma } from "@/_lib/prisma/prisma-client";
import camelcaseKeys from "camelcase-keys";

// * GET PERIOD TRANSACTION ====================
type GetPeriodTransactionProps = {
  publicId: string;
  period: string;
};
export const GetPeriodTransaction = async ({
  publicId,
  period,
}: GetPeriodTransactionProps) => {
  const startDate = new Date(period);
  startDate.setDate(1);
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 1);

  const query = await prisma.$queryRaw<{ initial_name: string }[]>`
        SELECT
          initial_name
        FROM initial_salary
          WHERE ref_id_user = (SELECT id FROM users WHERE public_id = ${publicId})
          AND created_at >= ${startDate}::date
            AND created_at < ${endDate}::date
          AND status != 'FINISH'::"IdStatus"
        `;
  return camelcaseKeys(query);
};

// * GET ID PERIOD TRANSACTION ====================
type TGetIdPeriodTransaction = {
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
};

type GetIdPeriodTransactionProps = {
  publicId: string;
  idPeriod: string;
};
export const GetIdPeriodTransaction = async ({
  publicId,
  idPeriod,
}: GetIdPeriodTransactionProps) => {
  const query = await prisma.$queryRaw<TGetIdPeriodTransaction[]>`
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
                        COALESCE((
                          SELECT json_build_object(
                            'date', DATE(created_at),
                            'amount', MAX(nominal)
                          )
                          FROM transactions
                          WHERE ref_id = (
                              SELECT id FROM initial_salary WHERE initial_name = ${idPeriod}
                          )
                          GROUP BY DATE(created_at) 
                          ORDER BY MAX(nominal) DESC
                          LIMIT 1
                        )) AS "biggestExpense",
                        COALESCE(AVG(nominal), 0) AS "averageExpense",
                        COALESCE(SUM(nominal), 0) AS "amountNominal",
                        COALESCE((
                        SELECT json_build_object(
                            'date', DATE(created_at),
                            'amount', SUM(nominal)
                        )
                        FROM transactions
                        WHERE ref_id = (
                          SELECT id FROM initial_salary WHERE initial_name = ${idPeriod}
                        )
                        GROUP BY DATE(created_at) 
                        ORDER BY SUM(nominal) DESC
                        LIMIT 1
                        ))AS "mostExpensiveDay"
                    FROM transactions
                    WHERE ref_id = (
                      SELECT id FROM initial_salary WHERE initial_name = ${idPeriod}
                    )
                ) result
            ) AS insight
        FROM initial_salary s
        WHERE
            s.ref_id_user = (
                SELECT id
                FROM users
                WHERE public_id = ${publicId}
            )
        AND s.initial_name = ${idPeriod};
        `;

  return camelcaseKeys(query);
};

// ! json_build_object(...) bertipe json, jika data yg ingin dikembalikan dalam bentuk ini harus berbentuk JSON juga !!!
