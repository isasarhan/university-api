import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectId, Types } from 'mongoose';
import { MajorEnum } from 'src/modules/students/interface/students.interface';

@Schema()
export class Participant {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  mobile: string;

  @Prop()
  comment: string;

  @Prop({ type: Boolean, default: false })
  acceptence: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  event: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Student' })
  studentId: ObjectId;

  @Prop({ type: String, enum: MajorEnum, default: MajorEnum.OTHER })
  major: MajorEnum;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export type ParticipantDocument = HydratedDocument<Participant>;

export const ParticipantSchema = SchemaFactory.createForClass(Participant);
