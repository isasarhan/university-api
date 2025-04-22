import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { GetEventsFilterDto } from './dto/get-events.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('add')
  create(@Body() createEventDto: CreateEventDto) {
    console.log('createEventDto', createEventDto);

    return this.eventsService.create(createEventDto);
  }

  @Get()
  async findAll(@Query() args: GetEventsFilterDto) {
    const filters = this.eventsService.filter(args);
    console.log('filters', filters);

    return this.eventsService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
