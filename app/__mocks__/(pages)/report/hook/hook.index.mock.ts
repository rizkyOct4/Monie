import {
  useQueryPeriodTransactions,
  useQueryPeriodIdTransactions,
} from "@/app/(pages)/report/hook/query/query-index";


// ! ReturnType *****
// ! TypeScript akan langsung memeriksa apakah bentuk mock masih sesuai.
// ! Kalau ada perubahan yang membuat tipe tidak cocok, kamu akan mendapat error saat compile, sehingga mock ikut diperbarui.
export const MockUseQueryPeriodTransactions = (): ReturnType<
  typeof useQueryPeriodTransactions
> => ({
  period: "2026-07",
  setPeriod: jest.fn(),
  PeriodTransactionData: [
    {
      id: "1",
      initialName: "Asking",
    },
  ],
  isFetchingPeriodTransaction: false,
});

export const MockUseQueryIdPeriodTransactions = (): ReturnType<
  typeof useQueryPeriodIdTransactions
> => ({
  idPeriod: "2x05-2",
  setIdPeriod: jest.fn(),
  IdPeriodTransactionData: [
    {
      salaryIncome: 2000000,
      salaryRemaining: 1800000,
      createdAt: new Date("2026-07-19T10:00:00.000Z"),
      updatedAt: new Date("2026-07-19T12:00:00.000Z"),
      status: "ACTIVE",
      insight: [
        {
          totalTransaction: 10,
          biggestExpense: {
            date: new Date("2026-07-19T10:00:00.000Z"),
            amount: 500000,
          },
          averageExpense: 150000,
          amountNominal: 1500000,
          mostExpensiveDay: {
            date: new Date("2026-07-19T10:00:00.000Z"),
            amount: 800000,
          },
        },
      ],
    },
  ],
  isFetchingIdPeriodTransaction: false,
});
