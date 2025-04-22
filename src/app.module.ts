import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FacilityModule } from './modules/facilities/facility.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ParticipantsModule } from './modules/participants/participants.module';
import { AuthMiddleware } from './common/middlewares/auth.middleware';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './modules/events/events.module';
import { StudentsModule } from './modules/students/students.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}.local`,
      load: [configuration],
    }),
    MongooseModule.forRoot(`${process.env.DATABASE_HOST}`),
    FacilityModule,
    UsersModule,
    AuthModule,
    EventsModule,
    ParticipantsModule,
    EventsModule,
    StudentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('users');
  }
}
