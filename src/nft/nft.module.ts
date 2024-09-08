import { Module } from '@nestjs/common';
import { NftService } from './nft.service';
import { NftController } from './nft.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [NftController],
  providers: [NftService],
  exports: [NftService],
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.getOrThrow('TON_API_URL'),
        timeout: 100000,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${configService.getOrThrow('TON_API_KEY')}`,
        },
      }),
    }),
  ],
})
export class NftModule {}
