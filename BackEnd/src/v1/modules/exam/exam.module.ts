import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Exam, ExamSchema } from './schemas/exam.schema';
import { APP_COLLECTIONS, APP_CONNECTION } from '../constants';
import { ExamService } from './services/exam.service';
import { ExamController } from './controllers/exam.controller';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Exam.name,
          schema: ExamSchema,
          collection: APP_COLLECTIONS.exam,
        },
      ],
      APP_CONNECTION,
    ),
  ],
  controllers: [ExamController],
  providers: [ExamService],
})
export class ExamModule {}
