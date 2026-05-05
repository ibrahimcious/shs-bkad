import { z } from "zod"
export const tablesSchema = z.object({
  NO: z.string().min(1),
  SKPD: z.string().min(1),
  Uraian: z.string().min(1),
  Spesifikasi: z.string().min(1),
  Satuan: z.string().min(1),
  Harga: z.string().min(1),
  Status: z.string().min(1),
  Elemen: z.string().min(1)
})

export type Table = z.infer<typeof tablesSchema>;
