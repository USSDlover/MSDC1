import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Question } from '../interfaces/question.interface';

export type ExamDocument = Exam & Document;

@Schema()
export class Exam extends Document {
  @Prop({
    type: String,
    required: true,
  })
  title;

  @Prop({
    type: Number,
    required: true,
  })
  startDate;

  @Prop({
    type: Number,
    required: true,
  })
  duration;

  @Prop({ required: true })
  questions: Question[];
}

export const ExamSchema = SchemaFactory.createForClass(Exam);
