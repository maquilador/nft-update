import { Module } from '@nestjs/common';
import { NftModule } from './nft/nft.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    ScheduleModule.forRoot(),
    NftModule,
    TasksModule,
  ],
})
export class AppModule {}
