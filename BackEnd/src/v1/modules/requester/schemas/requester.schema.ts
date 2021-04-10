import { Document, Schema as MSchema } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

import { AnswerInterface } from '../interfaces/answers.interface';

export type RequesterDocument = Requester & Document;

@Schema()
export class Requester extends Document {
  @Prop({ required: false })
  score: number;

  @Prop({ type: MSchema.Types.ObjectId, ref: 'Exam', required: true })
  exam: string;

  @Prop({ required: false, default: 0, type: Number })
  startedAt;

  @Prop({ required: false, default: 0, type: Number })
  finishedAt;

  @Prop({ required: false })
  answers: AnswerInterface[];
}

export const RequesterSchema = SchemaFactory.createForClass(Requester);
