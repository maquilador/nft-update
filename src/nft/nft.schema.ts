import { z } from 'zod';

export const metadataSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  image: z.string(),
});

export const ownerSchema = z.object({
  address: z.string(),
  name: z.string().optional(),
  icon: z.string().optional(),
  is_scam: z.boolean(),
  is_wallet: z.boolean(),
});

export const nftSchema = z.object({
  address: z.string(),
  owner: ownerSchema,
  metadata: metadataSchema,
});

export const collectionItemsResponseSchema = z.object({
  nft_items: z.array(nftSchema),
});

export type CollectionItemsResponse = z.infer<
  typeof collectionItemsResponseSchema
>;
