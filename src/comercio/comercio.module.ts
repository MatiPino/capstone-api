import { Module } from '@nestjs/common';
import { ComercioService } from './comercio.service';
import { ComercioController } from './comercio.controller';

@Module({
  controllers: [ComercioController],
  providers: [ComercioService],
})
export class ComercioModule {}
