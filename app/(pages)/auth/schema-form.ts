import { z } from "zod";
import { ForbiddenRegex, ForbiddenRegexEmail, CapitalizeRegex } from "@/_utils/Regex";

// ! REGEX ini BERURUTAN METHODNYA !!!! PERHATIKAN URUTANNYA !
export const zRegisterFormSchema = z.object({
  name: z
    .string()
    .min(0)
    .max(12, "* Max 12 Characters")
    .refine((val) => !ForbiddenRegex().test(val), {
      message: `* Contains invalid characters`,
    }),

  email: z
    .string()
    .min(0)
    .refine((val) => !ForbiddenRegexEmail().test(val), {
      message: "* Email contains invalid characters",
    }),

  password: z.string().min(8, "* Password must be at least 8 characters"),
  userType: z.string(),
});

export const zLoginFormSchema = z.object({
  email: z
    .string()
    .min(0)
    .refine((val) => !ForbiddenRegexEmail().test(val), {
      message: "Contains invalid characters",
    }),
  password: z.string().min(1, "Password must be at least 1 characters"),
});
