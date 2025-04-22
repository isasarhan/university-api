import { IsMongoId, IsOptional } from 'class-validator';
import { Pagination } from 'src/common/types/filter';

export class GetStudentsFilterDto extends Pagination {
  @IsOptional()
  @IsMongoId()
  facility?: string;
}
