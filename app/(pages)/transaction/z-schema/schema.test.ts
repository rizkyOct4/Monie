import { describe, expect, it } from "vitest";
import { FormPostSchema } from "./z-schema";

describe("FormPostSchema", () => {
  const validData = {
    date: "2026-06-12",
    images: [
      {
        name: "gambar-1.jpg",
        path: "/uploads/gambar-1.jpg",
      },
    ],
    description: "Pengeluaran makan siang",
    nominal: 50000,
  };

  it("should pass with valid data", () => {
    const result = FormPostSchema.safeParse(validData);

    expect(result.success).toBe(true);
  });

  it("should fail when date is empty", () => {
    const result = FormPostSchema.safeParse({
      ...validData,
      date: "",
    });

    expect(result.success).toBe(false);
  });

  it("should fail when images is empty", () => {
    const result = FormPostSchema.safeParse({
      ...validData,
      images: [],
    });

    expect(result.success).toBe(false);
  });

  it("should fail when description is less than 3 characters", () => {
    const result = FormPostSchema.safeParse({
      ...validData,
      description: "ab",
    });

    expect(result.success).toBe(false);
  });

  it("should fail when description exceeds 500 characters", () => {
    const result = FormPostSchema.safeParse({
      ...validData,
      description: "a".repeat(501),
    });

    expect(result.success).toBe(false);
  });

  it("should fail when nominal is zero", () => {
    const result = FormPostSchema.safeParse({
      ...validData,
      nominal: 0,
    });

    expect(result.success).toBe(false);
  });

  it("should fail when nominal is negative", () => {
    const result = FormPostSchema.safeParse({
      ...validData,
      nominal: -1000,
    });

    expect(result.success).toBe(false);
  });
});