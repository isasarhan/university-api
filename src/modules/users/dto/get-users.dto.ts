import { IsMongoId, IsOptional } from 'class-validator';
import { Pagination } from 'src/common/types/filter';

export class GetUsersFilterDto extends Pagination {
  @IsOptional()
  @IsMongoId()
  facility?: string;

  @IsOptional()
  isApproved?: boolean;
}
