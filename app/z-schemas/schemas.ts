import { z } from "zod";
import { ForbiddenRegex } from "@/_utils/Regex";

export const FormPostSchema = z.object({
  nameTransaction: z.string().refine((val) => !ForbiddenRegex().test(val), {
    message: `* Contains invalid characters`,
  }),

  date: z.date(),

  images: z
    .array(
      z.object({
        name: z.string(),
        path: z.string(),
      }),
    )
    .optional(),

  information: z.string().optional(),

  nominal: z.string()
});

export type FormPostType = z.infer<typeof FormPostSchema>;
