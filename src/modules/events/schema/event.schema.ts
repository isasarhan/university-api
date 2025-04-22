import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export enum EventTypeEnum {
  SCHOOL = 'school',
  UNIVERSITY = 'university',
  INSTITUTE = 'institute',
}

@Schema()
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Facility' })
  facility: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Participant', default: [] })
  participants: ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  team: ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  manager: ObjectId;

  @Prop({ required: true })
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export type EventDocument = HydratedDocument<Event>;

export const EventSchema = SchemaFactory.createForClass(Event);
