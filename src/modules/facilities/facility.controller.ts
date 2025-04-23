import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  Put,
  Req,
} from '@nestjs/common';
import { FacilityService } from './facility.service';
import { CreateFacilityDto } from './dto/create-facillity.dto';
import { Facility } from 'src/modules/facilities/schema/facility.schema';
import { UpdateUniversityDto } from './dto/update-facillity.dto';
import { GetFacilitiessFilterDto } from './dto/get-facilities.dto';
import { Request } from 'express';

@Controller('facility')
export class FacilityController {
  constructor(private readonly facilityService: FacilityService) {}

  @Post('add')
  create(@Body() createUniversityDto: CreateFacilityDto) {
    return this.facilityService.create(createUniversityDto);
  }

  @Get()
  findAll(@Query() args: GetFacilitiessFilterDto): Promise<Facility[]> {
    const filters = this.facilityService.filter(args);
    return this.facilityService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facilityService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUniversityDto: UpdateUniversityDto,
  ) {
    return this.facilityService.update(id, updateUniversityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facilityService.remove(id);
  }
}
