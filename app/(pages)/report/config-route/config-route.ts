export type GetProps =
  | {
      key: "periodTransactions";
      currentPath: string;
      period: string;
    }
  | {
      key: "idPeriodTransactions";
      currentPath: string;
      idPeriod: string;
    }
  | {
      key: "viewTotalTransactions";
      currentPath: string;
      pageParam: number;
      limit: number;
      view: string;
      id: string;
    };

export const ROUTES_REPORT = {
  GET: (props: GetProps) => {
    const { key, currentPath } = props;
    const params = new URLSearchParams(); // ! karakter khusus akan otomatis di-encode. contoh: ayam & goreng

    params.set("key", key);

    switch (key) {
      case "periodTransactions":
        params.set("period", String(props.period));
        break;
      case "idPeriodTransactions":
        params.set("id-period", String(props.idPeriod));
        break;
      case "viewTotalTransactions":
        params.set("view", String(props.view));
        params.set("id", String(props.id));
        params.set("page-param", String(props.pageParam));
        params.set("limit", String(props.limit));
        break;
      default:
        return "";
    }

    return `${currentPath}/api?${params.toString()}`;
  },
  // POST: ({
  //   key,
  //   currentPath,
  // }: {
  //   key: "newPostTransaction" | "postTransaction";
  //   currentPath?: string;
  // }) => {
  //   switch (key) {
  //     case "newPostTransaction":
  //     case "postTransaction":
  //       return `/transaction/api/action?key=${key}`;
  //     default:
  //       return "";
  //   }
  // },
  // PUT: ({
  //   key,
  //   currentPath,
  // }: {
  //   key: "putTransaction";
  //   currentPath: string;
  // }) => {
  //   switch (key) {
  //     case "putTransaction":
  //       return `${currentPath}/api/action?key=${key}`;
  //     default:
  //       return "";
  //   }
  // },
  // DELETE: ({
  //   key,
  //   currentPath,
  // }: {
  //   key: "deleteTransaction";
  //   currentPath: string;
  // }) => {
  //   switch (key) {
  //     case "deleteTransaction":
  //       return `${currentPath}/api/action?key=${key}`;
  //     default:
  //       return "";
  //   }
  // },
};
