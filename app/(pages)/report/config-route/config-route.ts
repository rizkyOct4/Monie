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
