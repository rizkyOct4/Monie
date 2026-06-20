
type GetProps = {
  key: "searchTransactions";
  currentPath: string;
  date: string;
  pageParam: number;
  limit: number;
}

export const ROUTES_TRANSACTION = {
  GET: ({ key, currentPath, date, pageParam, limit }: GetProps) => {
    switch (key) {
      case "searchTransactions":
        return `${currentPath}/api?key=${key}&search-transaction=${date}&page-param=${pageParam}&limit=${limit}`;
      default:
        return "";
    }
  },
  POST: ({
    key,
    currentPath,
  }: {
    key: "postTransaction" | "uploadNewProject";
    currentPath?: string;
  }) => {
    switch (key) {
      case "postTransaction":
        return `/transaction/api/action?key=${key}`;
      default:
        return "";
    }
  },
  UPDATE_ACTION: ({
    key,
    currentPath,
    year,
  }: {
    key: "updateImage";
    currentPath: string;
    year: string;
  }) => {
    switch (key) {
      case "updateImage":
        return `/admin/${currentPath}/api/action?key=${key}&year=${year}`;
      default:
        return "";
    }
  },
  DELETE_ACTION: ({
    key,
    currentPath,
  }: {
    key: "putDeleteProject";
    currentPath: string;
  }) => {
    switch (key) {
      case "putDeleteProject":
        return `/admin/${currentPath}/api/action?key=${key}`;
      default:
        return "";
    }
  },
};
