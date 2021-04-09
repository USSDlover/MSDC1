import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_COLLECTIONS, APP_CONNECTION } from '../constants';
import { Requester, RequesterSchema } from './schemas/requester.schema';
import { RequesterService } from './services/requester.service';

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
  providers: [RequesterService],
})
export class RequesterModule {}
