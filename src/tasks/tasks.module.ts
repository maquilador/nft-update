import { Module } from '@nestjs/common';
import { NftModule } from 'src/nft/nft.module';
import { TasksService } from './tasks.service';

@Module({
  providers: [TasksService],
  imports: [NftModule],
})
export class TasksModule {}
