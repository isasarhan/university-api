import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Facility } from 'src/modules/facilities/schema/facility.schema';
import { CreateFacilityDto } from './dto/create-facillity.dto';
import { UpdateUniversityDto } from './dto/update-facillity.dto';
import { GetFacilitiessFilterDto } from './dto/get-facilities.dto';

@Injectable()
export class FacilityService {
  constructor(
    @InjectModel(Facility.name) private universityModel: Model<Facility>,
  ) {}

  async create(createFacilityDto: CreateFacilityDto): Promise<Facility> {
    const createdUniversity = new this.universityModel(createFacilityDto);
    return await createdUniversity.save();
  }

  filter(args: GetFacilitiessFilterDto): Record<string, any> {
    return {
      ...(args.type && { type: args.type }),
    };
  }

  async findAll(filters: Record<string, any>): Promise<Facility[]> {
    return await this.universityModel.find(filters).exec();
  }

  async findOne(id: string | ObjectId) {
    return await this.universityModel.findById(id).exec();
  }

  async update(id: string, updateUniversityDto: UpdateUniversityDto) {
    const updatedUniversity = this.universityModel.findByIdAndUpdate(
      id,
      updateUniversityDto,
      { new: true },
    );
    return await updatedUniversity.exec();
  }

  async remove(id: string) {
    return await this.universityModel.findByIdAndDelete(id).exec();
  }
}
