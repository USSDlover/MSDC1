import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_COLLECTIONS, APP_CONNECTION } from '../constants';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: User.name,
          schema: UserSchema,
          collection: APP_COLLECTIONS.user,
        },
      ],
      APP_CONNECTION,
    ),
  ],
  providers: [UserService],
})
export class UserModule {}
