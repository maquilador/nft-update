import { Controller, Post } from '@nestjs/common';
import { NftService } from './nft.service';

@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  // для ручного тестирования
  @Post()
  updateInfo() {
    return this.nftService.updateInfo({
      accountId:
        '0:2fdf812146973a852cd8a72b0661559b9e62a13ad9770bc9b669e5ec3bec225e',
      batchSize: 10,
      limit: 10,
    });
  }
}
