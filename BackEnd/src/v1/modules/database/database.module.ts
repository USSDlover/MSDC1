import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_CONNECTION, APP_DB } from '../constants';

@Module({
  imports: [MongooseModule.forRoot(APP_DB, { connectionName: APP_CONNECTION })],
})
export class DatabaseModule {}
