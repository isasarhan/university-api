import { Injectable } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { Participant } from './schema/participant.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EventsService } from '../events/events.service';
import { StudentsService } from '../students/students.service';
import { GetParticipantsFilterDto } from './dto/get-participants.dto';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectModel(Participant.name) private participantModel: Model<Participant>,
    private evetsService: EventsService,
    private studentsService: StudentsService,
  ) {}

  async create(createParticipantDto: CreateParticipantDto) {
    const event = await this.evetsService.findOne(createParticipantDto.event);
    if (!event) return;
    if (event?.facility) {
      const student = await this.studentsService.findByMobile(
        createParticipantDto.mobile,
      );

      if (!student) {
        const student = await this.studentsService.create({
          facility: event?.facility,
          ...createParticipantDto,
        });

        const participant = new this.participantModel({
          ...createParticipantDto,
          studentId: student._id,
          event: event._id,
        });
        await this.evetsService.update(event?._id.toString(), {
          participants: [...event.participants, participant._id as any],
        });
        return await participant.save();
      }
    }
    const participant = new this.participantModel({
      ...createParticipantDto,
      event: event._id,
    });
    this.evetsService.update(event?._id.toString(), {
      participants: [...event.participants, participant._id as any],
    });
    return await participant.save();
  }

  filter(args: GetParticipantsFilterDto): Record<string, any> {
    return {
      ...(args.event && { event: new Types.ObjectId(args.event) }),
    };
  }

  async findAll(filters: Record<string, any>, page = 1, limit = 30) {
    const skip = (page - 1) * limit;

    const [participants, total] = await Promise.all([
      this.participantModel.find(filters).limit(limit).skip(skip).exec(),
      this.participantModel.countDocuments(),
    ]);

    return {
      data: participants,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    return await this.participantModel.findById(id).exec();
  }

  async findByMobile(mobile: string) {
    return await this.participantModel.findOne({ mobile }).exec();
  }

  async update(id: string, updateUserDto: UpdateParticipantDto) {
    const user = this.participantModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    return await user.exec();
  }

  async remove(id: string) {
    return await this.participantModel.findByIdAndDelete(id).exec();
  }
}
