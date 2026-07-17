type GetProps = {
  key: "periodTransactions" | "idPeriodTransactions";
  currentPath: string;
  month?: string;
  year?: string;
  idPeriod?: string;
};

export const ROUTES_REPORT = {
  GET: ({ key, currentPath, month, year, idPeriod }: GetProps) => {
    switch (key) {
      case "periodTransactions":
        return `${currentPath}/api?key=${key}&month=${month}&year=${year}`;
      case "idPeriodTransactions":
        return `${currentPath}/api?key=${key}&id-period=${idPeriod}`;
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
