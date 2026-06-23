export type IdTransactionsDataType = {
  id: string;
  initialName: string;
};

export type TransactionsDataType = {
  id: string;
  refId: string;
  information: string;
  nominal: number;
  createdAt: Date;
  updatedAt: Date;
};
