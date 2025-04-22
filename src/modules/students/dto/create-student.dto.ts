import { IsEnum, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';
import { MajorEnum } from '../interface/students.interface';

export class CreateStudentDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  mobile: string;

  @IsOptional()
  comment?: string;

  @IsEnum(MajorEnum)
  @IsOptional()
  major?: MajorEnum;

  @IsNotEmpty()
  @IsMongoId()
  facility: ObjectId;
}
