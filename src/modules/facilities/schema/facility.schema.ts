import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export enum FacilityTypeEnum {
  SCHOOL = 'school',
  UNIVERSITY = 'university',
  INSTITUTE = 'institute',
}

@Schema()
export class Facility {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  shortHand: string;

  @Prop({
    type: String,
    enum: FacilityTypeEnum,
    default: FacilityTypeEnum.UNIVERSITY,
  })
  type: FacilityTypeEnum;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  leader: ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export type FacilityDocument = HydratedDocument<Facility>;

export const FacilitySchema = SchemaFactory.createForClass(Facility);
