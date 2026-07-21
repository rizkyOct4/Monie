export type PeriodTransactionDataType = {
  id: string;
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
    };
    averageExpense: number;
    amountNominal: number;
    mostExpensiveDay: {
      date: Date;
      amount: number;
    };
  }[];
};
