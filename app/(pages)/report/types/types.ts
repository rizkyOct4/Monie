export type IdPeriodTransactionDataType = {
  salaryIncome: number;
  salaryRemaining: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  insight: {
    totaltransaction: number;
    biggestexpense: {
      date: Date;
      amount: number;
    };
    averageexpense: number;
    amountnominal: number;
    mostexpensiveday: {
      date: Date;
      amount: number;
    };
  }[];
};
