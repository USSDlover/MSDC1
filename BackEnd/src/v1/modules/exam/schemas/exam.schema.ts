import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Question } from '../interfaces/question.interface';

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

  @Prop({ required: [true, 'At least one question required'] })
  questions: Question[];
}

export const ExamSchema = SchemaFactory.createForClass(Exam);
