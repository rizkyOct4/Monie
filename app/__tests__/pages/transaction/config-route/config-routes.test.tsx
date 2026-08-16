import {
  ROUTES_TRANSACTION,
  GetProps,
} from "@/app/(pages)/transaction/config-route/config-route";

describe("ROUTES_TRANSACTION.GET", () => {
  it("should generate URL for transactions", () => {
    const result = ROUTES_TRANSACTION.GET({
      key: "transactions",
      currentPath: "/transaction",
      date: "2026-08-16",
      pageParam: 1,
      limit: 10,
    });

    expect(result).toBe(
      "/transaction/api?key=transactions&date-transaction=2026-08-16&page-param=1&limit=10",
    );
  });

  it("should generate URL for searchTransactions and encode special characters in search", () => {
    const result = ROUTES_TRANSACTION.GET({
      key: "searchTransactions",
      currentPath: "/transaction",
      search: "makan & goreng",
    });

    expect(result).toBe(
      "/transaction/api?key=searchTransactions&search-transaction=makan+%26+goreng",
    );
  });

  it("should generate URL for idTransactions", () => {
    const result = ROUTES_TRANSACTION.GET({
      key: "idTransactions",
      currentPath: "/transaction",
      pageParam: 2,
      limit: 20,
    });

    expect(result).toBe(
      "/transaction/api?key=idTransactions&page-param=2&limit=20",
    );
  });

  it("should return empty string for unknown key", () => {
    const result = ROUTES_TRANSACTION.GET({
      key: "unknown",
      currentPath: "/transaction",
    } as GetProps);

    expect(result).toBe("");
  });
});
