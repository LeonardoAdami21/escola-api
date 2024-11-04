import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './config/database.provider';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [...databaseProviders],
  exports: [...databaseProviders]
})
export class AppModule {}
