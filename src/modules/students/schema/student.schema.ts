import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectId, Types } from 'mongoose';
import { MajorEnum } from '../interface/students.interface';

@Schema()
export class Student {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  mobile: string;

  @Prop()
  comment: string;

  @Prop({ type: String, enum: MajorEnum, default: MajorEnum.OTHER })
  major: MajorEnum;

  @Prop({ type: Types.ObjectId, ref: 'Facility' })
  facility: ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export type StudentDocument = HydratedDocument<Student>;

export const StudentSchema = SchemaFactory.createForClass(Student);
