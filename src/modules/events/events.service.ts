import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './schema/event.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { GetEventsFilterDto } from './dto/get-events.dto';
import { FacilityService } from '../facilities/facility.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    private facilityService: FacilityService,
  ) {}

  async create(createEventDto: CreateEventDto) {
    if (createEventDto?.facility) {
      const facility = await this.facilityService.findOne(
        createEventDto.facility,
      );
      if (!facility) throw new Error('Facility Not Found!');
      const participant = new this.eventModel({
        ...createEventDto,
        facility: facility._id,
      });
      return await participant.save();
    }
    const participant = new this.eventModel(createEventDto);
    return await participant.save();
  }
  filter(args: GetEventsFilterDto): Record<string, any> {
    return {
      ...(args.facility && { facility: new Types.ObjectId(args.facility) }),
    };
  }
  async findAll(filters: Record<string, any>, page = 1, limit = 30) {
    const skip = (page - 1) * limit;

    const [events, total] = await Promise.all([
      this.eventModel.find(filters).limit(limit).skip(skip).exec(),
      this.eventModel.countDocuments(),
    ]);

    return {
      data: events,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string | ObjectId) {
    return await this.eventModel.findById(id).exec();
  }

  async findByMobile(mobile: string) {
    return await this.eventModel.findOne({ mobile }).exec();
  }

  async update(id: string | ObjectId, updateEventDto: UpdateEventDto) {
    if (updateEventDto.facility) {
      const facility = await this.facilityService.findOne(updateEventDto.facility)

      if (!facility) 
        throw new Error('Facility Not Found!');
      
      const user = this.eventModel.findByIdAndUpdate(id, {
        ...updateEventDto,
        facility: facility._id,
      }, {
        new: true,
      });
      
      return await user.exec();
    }
    const event = this.eventModel.findByIdAndUpdate(id, updateEventDto, {
      new: true,
    });
    return await event.exec();
  }

  async remove(id: string | ObjectId) {
    return await this.eventModel.findByIdAndDelete(id).exec();
  }
}
