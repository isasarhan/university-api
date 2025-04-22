import { Module } from '@nestjs/common';
import { AuthControlller } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AuthControlller],
  providers: [AuthService],
})
export class AuthModule {}
