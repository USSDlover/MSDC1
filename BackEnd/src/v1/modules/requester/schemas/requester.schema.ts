import { Document, Schema as MSchema } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

import { AnswerInterface } from '../interfaces/answers.interface';
import { Exam } from '../../exam/schemas/exam.schema';

export type RequesterDocument = Requester & Document;

@Schema()
export class Requester extends Document {
  @Prop({ required: false })
  score: number;

  @Prop({ type: MSchema.Types.ObjectId, ref: 'Exam', required: true })
  exam: Exam;

  @Prop({ required: false, default: false, type: Boolean })
  started;

  @Prop({ required: false })
  answers: AnswerInterface[];
}

export const RequesterSchema = SchemaFactory.createForClass(Requester);
