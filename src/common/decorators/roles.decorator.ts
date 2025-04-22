import { SetMetadata } from '@nestjs/common';
import { UserRoleEnum } from 'src/modules/users/schema/user.schema';

export const Roles = (...roles: UserRoleEnum[]) => SetMetadata('roles', roles);
