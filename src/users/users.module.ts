import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../config/database.module';
import { AuthModule } from '../auth/auth.module';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [DatabaseModule,
    forwardRef(() => AuthModule)
  ],
  controllers: [UsersController],
  providers: [UsersService, {
    provide: 'USERS_REPOSITORY',
    useClass: PrismaClient
  } ],
  exports: [UsersService]
})
export class UsersModule {}
