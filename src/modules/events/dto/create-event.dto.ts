import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateEventDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsMongoId()
  facility?: ObjectId;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  participants: ObjectId[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  team?: ObjectId[];

  @IsOptional()
  @IsMongoId()
  manager?: ObjectId;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate: Date;
}
