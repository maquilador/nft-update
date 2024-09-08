import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { collectionItemsResponseSchema } from './nft.schema';
import { chunkArray } from 'src/lib/chunk-array';

@Injectable()
export class NftService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  async getInfo(accountId: string, limit?: number, offset?: number) {
    const apiUrl = `/nfts/collections/${accountId}/items`;

    try {
      const { data } = await firstValueFrom(
        this.httpService.get(apiUrl, {
          params: {
            limit: limit ?? 1000,
            offset: offset ?? 0,
          },
        }),
      );

      const parsedData = collectionItemsResponseSchema.parse(data);

      return parsedData;
    } catch (error) {
      console.error('Error fetching TON API:', error);
      throw new Error('Failed to fetch TON API');
    }
  }

  async updateInfo({
    accountId,
    batchSize,
    limit,
    offset,
  }: {
    accountId: string;
    batchSize: number;
    limit?: number;
    offset?: number;
  }) {
    const data = await this.getInfo(accountId, limit, offset);

    try {
      const batches = chunkArray(data.nft_items, batchSize);

      for (const batch of batches) {
        await this.prisma.$transaction(
          batch.map((nft) => {
            const { metadata, owner, address } = nft;
            const { name, description, image } = metadata;
            const { address: ownderAddress } = owner;

            return this.prisma.nft.upsert({
              where: { address },
              update: {
                name,
                description,
                image,
                owner: ownderAddress,
              },
              create: {
                address,
                name,
                description,
                image,
                owner: ownderAddress,
              },
            });
          }),
        );
      }
    } catch (error) {
      console.error('Error updating nfts:', error);
      throw new Error('Failed to update nfts');
    }
  }
}
