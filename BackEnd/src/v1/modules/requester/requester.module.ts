import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { APP_COLLECTIONS, APP_CONNECTION } from '../constants';

import { Requester, RequesterSchema } from './schemas/requester.schema';
import { Exam, ExamSchema } from '../exam/schemas/exam.schema';
import { RequesterService } from './services/requester.service';
import { RequestingService } from './services/requesting.service';
import { ValidatingRequesterService } from './services/validating-requester.service';
import { RequesterController } from './controllers/requester.controller';
import { QuestionService } from '../exam/services/question.service';
import { Question, QuestionSchema } from '../exam/schemas/question.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Requester.name,
          schema: RequesterSchema,
          collection: APP_COLLECTIONS.requester,
        },
        {
          name: Exam.name,
          schema: ExamSchema,
          collection: APP_COLLECTIONS.exam,
        },
        {
          name: Question.name,
          schema: QuestionSchema,
          collection: APP_COLLECTIONS.question,
        },
      ],
      APP_CONNECTION,
    ),
  ],
  providers: [
    RequesterService,
    RequestingService,
    ValidatingRequesterService,
    QuestionService,
  ],
  controllers: [RequesterController],
})
export class RequesterModule {}
