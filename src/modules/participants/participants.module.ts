import { Module } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ParticipantsController } from './participants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Participant, ParticipantSchema } from './schema/participant.schema';
import { EventsModule } from '../events/events.module';
import { StudentsModule } from '../students/students.module';

@Module({
  controllers: [ParticipantsController],
  providers: [ParticipantsService],
  imports: [
    EventsModule,
    StudentsModule,
    MongooseModule.forFeature([
      { name: Participant.name, schema: ParticipantSchema },
    ]),
  ],
})
export class ParticipantsModule {}
