export type IdTransactionsDataType = {
  id: string;
  initialName: string;
  status: "ACTIVE" | "DEFAULT" | "FINISH";
};

export type TransactionsDataType = {
  id: string;
  refId: string;
  images: {
    id: string;
    imageName: string;
    imageUrl: string;
  }[];
  information: string;
  nominal: number;
  createdAt: Date;
  updatedAt: Date;
  status: "FINISH" | "ACTIVE";
};
