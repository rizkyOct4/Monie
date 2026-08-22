export type PeriodTransactionDataType = {
  initialName: string;
};

export type IdPeriodTransactionDataType = {
  salaryIncome: number;
  salaryRemaining: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  insight: {
    totalTransaction: number;
    biggestExpense: {
      date: Date;
      amount: number;
    } | null;
    averageExpense: number;
    amountNominal: number;
    mostExpensiveDay: {
      date: Date;
      amount: number;
    } | null;
  }[];
};

// * VIEW TOTAL TRANSACTIONS
export type TVTotalTransactions = {
  date: Date;
  transactions: {
    createdAt: Date;
    id: string;
    information: string;
    nameTransaction: string;
    nominal: number;
    status: "AVAILABLE" | "DELETED";
    transactionModel: "NORMAL" | "INCOME";
    updatedAt: Date;
  }[];
};
