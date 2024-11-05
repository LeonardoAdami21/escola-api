import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './config/database.provider';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { InstituitionsModule } from './instituitions/instituitions.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    InstituitionsModule,
    ClientsModule,
  ],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class AppModule {}
