import { IsMongoId, IsOptional } from 'class-validator';

export class GetParticipantsFilterDto {
  @IsOptional()
  @IsMongoId()
  event: string;
}
