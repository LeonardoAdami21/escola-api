import { Module } from '@nestjs/common';
import { InstituitionsService } from './instituitions.service';
import { InstituitionsController } from './instituitions.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [InstituitionsController],
  providers: [InstituitionsService, {
    provide: 'INSTITUITIONS_REPOSITORY',
    useClass: PrismaClient,
  }],
})
export class InstituitionsModule {}
