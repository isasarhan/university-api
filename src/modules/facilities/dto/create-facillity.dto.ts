import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { FacilityTypeEnum } from '../schema/facility.schema';

export class CreateFacilityDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  shortHand: string;

  @IsEnum(FacilityTypeEnum)
  @IsOptional()
  type?: FacilityTypeEnum;
}
