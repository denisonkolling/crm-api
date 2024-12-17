import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SearchTaskDto } from './dto/search-task.dto';
import { plainToInstance } from 'class-transformer';
import { TaskDto } from './dto/task.dto';

@Controller('tasks')
@ApiTags('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createTaskDto: CreateTaskDto): TaskDto {
    const task = this.tasksService.create(createTaskDto);
    const dto = plainToInstance(TaskDto, task, { excludeExtraneousValues: true });
    return dto;
  }


  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number to retrieve (default is 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of tasks to retrieve per page (default is 10)' })
  @ApiQuery({ name: 'sortBy', required: false, type: String, description: 'Field by which to sort the tasks (default is "id")' })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'], description: 'Order in which to sort the tasks (default is "asc")' })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortBy') sortBy: string = 'id',
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc'
  ) {
    return this.tasksService.findAll({ page, limit, sortBy, sortOrder });
  }

  @Get('find/:id')
  @ApiOperation({ summary: 'Get a task by id' })
  findOne(@Param('id') id: number) {
    const task = this.tasksService.findOne(+id);
    return plainToInstance(TaskDto, task, { excludeExtraneousValues: true });
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a task by id' })
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    const task = this.tasksService.update(+id, updateTaskDto);
    return plainToInstance(TaskDto, task, { excludeExtraneousValues: true });
  }

  @Delete('remove/:id')
  @ApiOperation({ summary: 'Delete a task by id' })
  remove(@Param('id') id: number) {
    return this.tasksService.remove(+id);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search tasks with filters' })
  async search(@Query() searchParams: SearchTaskDto) {
    return this.tasksService.search(searchParams);
  }
}
