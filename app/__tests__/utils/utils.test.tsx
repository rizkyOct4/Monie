import { FormatCurrency } from "@/_utils/format-currency";

describe("Format Currency", () => {
  it("Test", () => {
    expect(FormatCurrency(1000000)).toBe("Rp1.000.000");
  });
});
