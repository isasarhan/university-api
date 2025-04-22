import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './schema/student.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { GetStudentsFilterDto } from './dto/get-students.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const participant = new this.studentModel(createStudentDto);
    return await participant.save();
  }

  filter(args: GetStudentsFilterDto): Record<string, any> {
    return {
      ...(args.facility && { facility: new Types.ObjectId(args.facility) }),
    };
  }
  async findAll(filters: Record<string, any>, page = 1, limit = 30) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.studentModel
        .find(filters)
        .limit(limit)
        .skip(skip)
        .populate('facility')
        .exec(),
      this.studentModel.countDocuments(),
    ]);

    return {
      data: users,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }
  async findOne(id: string) {
    return await this.studentModel.findById(id).populate('facililty').exec();
  }

  async findByMobile(mobile: string) {
    return await this.studentModel
      .findOne({ mobile })
      .populate('facililty')
      .exec();
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const user = this.studentModel.findByIdAndUpdate(id, updateStudentDto, {
      new: true,
    });
    return await user.exec();
  }

  async remove(id: string) {
    return await this.studentModel.findByIdAndDelete(id).exec();
  }
}
