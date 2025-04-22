import { Module } from '@nestjs/common';
import { FacilityService } from './facility.service';
import { FacilityController } from './facility.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Facility,
  FacilitySchema,
} from 'src/modules/facilities/schema/facility.schema';

@Module({
  controllers: [FacilityController],
  providers: [FacilityService],
  imports: [
    MongooseModule.forFeature([
      { name: Facility.name, schema: FacilitySchema },
    ]),
  ],
  exports: [FacilityService],
})
export class FacilityModule {}
