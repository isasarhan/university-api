import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schema/user.schema';
import { GetUsersFilterDto } from './dto/get-users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();
    if (existingUser) {
      throw new ConflictException(
        `User with email ${createUserDto.email} already exists.`,
      );
    }

    const user = new this.userModel({
      ...createUserDto,
    });

    return await user.save();
  }
  filter(args: GetUsersFilterDto): Record<string, any> {
    return {
      ...(args.facility && { facility: new Types.ObjectId(args.facility) }),
      ...(args.isApproved && { isApproved: args.isApproved }),
    };
  }
  async findAll(filters: Record<string, any>, page = 1, limit = 30) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.userModel
        .find(filters)
        .limit(limit)
        .skip(skip)
        .populate('facility')
        .exec(),
      this.userModel.countDocuments(),
    ]);

    return {
      data: users,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    return await this.userModel.findById(id).populate('facility').exec();
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }).populate('facility').exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    return await user.exec();
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
