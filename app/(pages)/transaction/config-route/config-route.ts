export type GetProps =
  | {
      key: "transactions";
      currentPath: string;
      date?: string;
      transactionName: string;
      pageParam: number;
      limit: number;
    }
  | {
      key: "searchTransactions";
      currentPath: string;
      search: string;
    }
  | {
      key: "idTransactions";
      currentPath: string;
      pageParam: number;
      limit: number;
    }
  | {
      key: "unknown";
      currentPath: "/transaction";
    };

export type PostProps = {
  key: "newPostTransaction" | "postTransaction";
};
export type PutProps = {
  key: "putTransaction";
  currentPath: string;
};
export type DeleteProps = {
  key: "deleteTransaction";
  currentPath: string;
};

export const ROUTES_TRANSACTION = {
  GET: (props: GetProps) => {
    const { key, currentPath } = props;
    const params = new URLSearchParams(); // ! karakter khusus akan otomatis di-encode. contoh: ayam & goreng

    params.set("key", key);

    switch (key) {
      case "transactions":
        params.set("transaction-date", props.date ?? "");
        params.set("transaction-name", props.transactionName);
        params.set("page-param", String(props.pageParam));
        params.set("limit", String(props.limit));
        break;

      case "searchTransactions":
        params.set("search-transaction", props.search);
        break;

      case "idTransactions":
        params.set("page-param", String(props.pageParam));
        params.set("limit", String(props.limit));
        break;

      default:
        return "";
    }

    return `${currentPath}/api?${params.toString()}`;
  },
  POST: (props: PostProps) => {
    const { key } = props;
    const params = new URLSearchParams(); // ! karakter khusus akan otomatis di-encode. contoh: ayam & goreng

    params.set("key", key);

    switch (key) {
      case "newPostTransaction":
      case "postTransaction":
        return `/transaction/api/action?${params.toString()}`;
      default:
        return "";
    }
  },
  PUT: (props: PutProps) => {
    const { key, currentPath } = props;
    const params = new URLSearchParams(); // ! karakter khusus akan otomatis di-encode. contoh: ayam & goreng

    params.set("key", key);
    switch (key) {
      case "putTransaction":
        return `${currentPath}/api/action?${params.toString()}`;
      default:
        return "";
    }
  },
  DELETE: (props: DeleteProps) => {
    const { key, currentPath } = props;
    const params = new URLSearchParams(); // ! karakter khusus akan otomatis di-encode. contoh: ayam & goreng

    params.set("key", key);
    switch (key) {
      case "deleteTransaction":
        return `${currentPath}/api/action?${params.toString()}`;
      default:
        return "";
    }
  },
};
