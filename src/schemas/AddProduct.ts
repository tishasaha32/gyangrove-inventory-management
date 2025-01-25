import { z } from "zod";

export const AddProductSchema = z.object({
  name: z.string(),
  price: z.string(),
  category: z.string(),
  stock: z.string(),
});
