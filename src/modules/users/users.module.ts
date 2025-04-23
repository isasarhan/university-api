import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { FacilityModule } from '../facilities/facility.module';

@Module({
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [FacilityModule, 
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
})
export class UsersModule {}
