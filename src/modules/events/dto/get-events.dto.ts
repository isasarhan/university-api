import { IsMongoId, IsOptional } from 'class-validator';

export class GetEventsFilterDto {
  @IsOptional()
  @IsMongoId()
  facility: string;
}
