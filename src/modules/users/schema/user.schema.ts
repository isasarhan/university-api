import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectId, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export enum UserRoleEnum {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
}

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Types.ObjectId, ref: 'Facility' })
  facility: ObjectId;

  @Prop({ type: String, enum: UserRoleEnum, default: UserRoleEnum.USER })
  role: UserRoleEnum;

  @Prop({ type: Boolean, default: false })
  isApproved: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.matchPassword = async function (
  enteredPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
