import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_COLLECTIONS, APP_CONNECTION } from '../constants';
import { Requester, RequesterSchema } from './schemas/requester.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Requester.name,
          schema: RequesterSchema,
          collection: APP_COLLECTIONS.requester,
        },
      ],
      APP_CONNECTION,
    ),
  ],
})
export class RequesterModule {}
