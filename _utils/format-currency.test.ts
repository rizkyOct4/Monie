import { describe, expect, it } from "vitest";
import { FormatCurrency } from "./format-currency";

describe("formatCurrency", () => {
  it("should format rupiah correctly", () => {
    expect(FormatCurrency(5000000)).toBe("Rp5.000.000");
  });
});
