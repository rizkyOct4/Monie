import { z } from "zod";

export const FormPostSchema = z.object({
  date: z.string().min(1, "Tanggal wajib diisi"),

  images: z
    .array(
      z.object({
        name: z.string(),
        path: z.string(),
      }),
    )
    .min(1, "Minimal 1 gambar"),

  description: z
    .string()
    .min(3, "Keterangan minimal 3 karakter")
    .max(500, "Keterangan maksimal 500 karakter"),

  nominal: z
    .number({
      error: "Nominal wajib diisi",
    })
    .positive("Nominal harus lebih dari 0"),
});

export type FormPostType = z.infer<typeof FormPostSchema>;