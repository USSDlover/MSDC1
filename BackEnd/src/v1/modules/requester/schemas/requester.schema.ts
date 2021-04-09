import { Document, Schema as MSchema } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Exam } from '../../exam/schemas/exam.schema';

export type RequesterDocument = Requester & Document;

@Schema()
export class Requester extends Document {
  @Prop({ required: false })
  score: number;

  @Prop({ type: MSchema.Types.ObjectId, ref: 'Exam', required: true })
  exam: Exam;
}

export const RequesterSchema = SchemaFactory.createForClass(Requester);
