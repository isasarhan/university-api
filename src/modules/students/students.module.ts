import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schema/student.schema';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  exports: [StudentsService, MongooseModule],
})
export class StudentsModule {}
