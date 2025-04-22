import { PartialType } from '@nestjs/mapped-types';
import { CreateFacilityDto } from './create-facillity.dto';

export class UpdateUniversityDto extends PartialType(CreateFacilityDto) {}
