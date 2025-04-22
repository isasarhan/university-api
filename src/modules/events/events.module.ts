import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './schema/event.schema';
import { FacilityModule } from '../facilities/facility.module';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  imports: [
    FacilityModule,
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  exports: [EventsService, MongooseModule],
})
export class EventsModule {}
