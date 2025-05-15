import { z } from "zod";

export const createStoreDTO = z.object({
  storeName: z.string().min(1, "Store name is required"),
  posterURL: z.string().url("Invalid image URL").optional(),
  owner: z.string().min(1, "Owner ID is required").optional(),
  panNumber: z.string().min(1, "PAN number is required"),
  gstNumber: z.string().min(1, "GST number is required"),
  products: z.array(z.string()).optional(),
  services: z.array(z.string()).optional(),
});

export type CreateStoreInput = z.infer<typeof createStoreDTO>;
