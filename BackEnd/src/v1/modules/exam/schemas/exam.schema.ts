import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MSchema } from 'mongoose';

import { QuestionInterface } from '../interfaces/question.interface';

export type ExamDocument = Exam & Document;

@Schema()
export class Exam extends Document {
  @Prop({
    type: String,
    required: [true, 'Title is required for exam'],
  })
  title;

  @Prop({
    type: Number,
    required: [true, 'Make sure to select start date'],
  })
  startDate;

  @Prop({
    type: Number,
    required: [true, 'Make sure to say how much it takes'],
  })
  duration;

  @Prop({
    type: MSchema.Types.ObjectId,
    required: false,
    ref: 'Question',
  })
  questions: QuestionInterface[];

  @Prop({ required: false, default: false, type: Boolean })
  expired;

  @Prop({ type: Number, required: false })
  expireAt;
}

export const ExamSchema = SchemaFactory.createForClass(Exam);
