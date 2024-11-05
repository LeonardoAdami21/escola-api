import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, {
    provide: 'CLIENTS_REPOSITORY',
    useClass: PrismaClient,
  }],
})
export class ClientsModule {}
