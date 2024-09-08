import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NftService } from 'src/nft/nft.service';

@Injectable()
export class TasksService {
  constructor(private readonly nftService: NftService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  updateNfts() {
    this.nftService.updateInfo({
      accountId:
        '0:2fdf812146973a852cd8a72b0661559b9e62a13ad9770bc9b669e5ec3bec225e',
      batchSize: 10,
      limit: 10,
    });

    console.log('Called update nfts from cron');
  }
}
