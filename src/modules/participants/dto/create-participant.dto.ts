import {
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { MajorEnum } from 'src/modules/students/interface/students.interface';

export class CreateParticipantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(MajorEnum)
  @IsOptional()
  major?: MajorEnum;

  @IsString()
  @IsNotEmpty()
  mobile: string;

  @IsOptional()
  comment?: string;

  @IsOptional()
  @IsBoolean()
  acceptence?: boolean;

  @IsMongoId()
  @IsNotEmpty()
  event: ObjectId;
}
