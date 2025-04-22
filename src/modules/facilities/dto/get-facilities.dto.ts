import { IsEnum, IsOptional } from 'class-validator';
import { FacilityTypeEnum } from '../schema/facility.schema';

export class GetFacilitiessFilterDto {
  @IsEnum(FacilityTypeEnum)
  @IsOptional()
  type?: FacilityTypeEnum;
}
