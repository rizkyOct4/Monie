type GetProps = {
  key:
    | "transactions"
    | "searchTransactions"
    | "idTransactions"
    | "PutIdTransactions";
  currentPath: string;
  date?: string;
  search?: string;
  pageParam?: number;
  limit?: number;
  idTransaction?: string;
};

export const ROUTES_TRANSACTION = {
  GET: ({
    key,
    currentPath,
    date,
    search,
    pageParam,
    limit,
    idTransaction,
  }: GetProps) => {
    switch (key) {
      case "transactions":
        return `${currentPath}/api?key=${key}&date-transaction=${date}&page-param=${pageParam}&limit=${limit}`;
      case "searchTransactions":
        return `${currentPath}/api?key=${key}&search-transaction=${search}`;
      case "idTransactions":
        return `${currentPath}/api?key=${key}&page-param=${pageParam}&limit=${limit}`;
      case "PutIdTransactions":
        return `${currentPath}/api?key=${key}&id-transaction=${idTransaction}`;
      default:
        return "";
    }
  },
  POST: ({
    key,
    currentPath,
  }: {
    key: "newPostTransaction" | "postTransaction";
    currentPath?: string;
  }) => {
    switch (key) {
      case "newPostTransaction":
      case "postTransaction":
        return `/transaction/api/action?key=${key}`;
      default:
        return "";
    }
  },
  PUT: ({
    key,
    currentPath,
  }: {
    key: "putTransaction";
    currentPath: string;
  }) => {
    switch (key) {
      case "putTransaction":
        return `${currentPath}/api/action?key=${key}`;
      default:
        return "";
    }
  },
  DELETE: ({
    key,
    currentPath,
  }: {
    key: "deleteTransaction";
    currentPath: string;
  }) => {
    switch (key) {
      case "deleteTransaction":
        return `${currentPath}/api/action?key=${key}`;
      default:
        return "";
    }
  },
};
