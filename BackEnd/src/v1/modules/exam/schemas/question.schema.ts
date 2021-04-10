import { Document, Schema as MSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exam } from './exam.schema';

export type QuestionDocument = Question & Document;

@Schema()
export class Question extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  answers: {
    1: string;
    2?: string;
    3?: string;
    4?: string;
  };

  @Prop({ required: true })
  correct: number;

  @Prop({
    type: MSchema.Types.ObjectId,
    ref: 'Exam',
    required: true,
  })
  exam: Exam;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
