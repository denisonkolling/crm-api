import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TaskResponseDto } from './dto/response-task.dto';
import { SearchTaskDto } from './dto/search-task.dto';

@Controller('tasks')
@ApiTags('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  findAll() {
    return this.tasksService.findAll();
  }

  @Get('find/:id')
  @ApiOperation({ summary: 'Get a task by id' })
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a task by id' })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete('remove/:id')
  @ApiOperation({ summary: 'Delete a task by id' })
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search tasks with filters' })
  async search(@Query() searchParams: SearchTaskDto) {
    return this.tasksService.search(searchParams);
  }


}
