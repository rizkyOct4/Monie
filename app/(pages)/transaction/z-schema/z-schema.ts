import { z } from "zod";
import { ForbiddenRegex } from "@/_utils/Regex";


// * POST =============================
export const FormNewPostSchema = z.object({
  nameTransaction: z.string().refine((val) => !ForbiddenRegex().test(val), {
    message: `* Contains invalid characters`,
  }),
  initialNominal: z.string().max(9),
});

export type FormNewPostType = z.infer<typeof FormNewPostSchema>;


export const FormPostSchema = z.object({
  nameTransaction: z.string(),

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


// * PUT =============================
export const FormPutSchema = z.object({
  existId: z.string(),
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

export type FormPutType = z.infer<typeof FormPutSchema>;
