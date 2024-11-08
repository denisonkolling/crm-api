import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import { AccountsService } from 'src/accounts/accounts.service';
import { LeadsService } from 'src/leads/leads.service';
import { OpportunitiesService } from 'src/opportunities/opportunities.service';

@Injectable()
export class TasksService {

  constructor(
    private readonly em: EntityManager,
    private readonly accountsService: AccountsService,
    private readonly leadsService: LeadsService,
    private readonly opportunityService: OpportunitiesService,

  ) { }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task();

    if (createTaskDto.accountId) {
      task.account = await this.accountsService.findOne(createTaskDto.accountId);
    }

    if (createTaskDto.leadId) {
      task.lead = await this.leadsService.findOne(createTaskDto.leadId);
    }

    if (createTaskDto.opportunityId) {
      task.opportunity = await this.opportunityService.findOne(createTaskDto.opportunityId);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { accountId, leadId, opportunityId, ...dtoWithoutIds } = createTaskDto;
    this.em.assign(task, dtoWithoutIds);
    await this.em.persistAndFlush(task);
    return task;
  }

  async findAll(): Promise<Task[]> {
    return await this.em.find(Task, {});
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.em.findOne(Task, id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.em.findOne(Task, id);
    this.em.assign(task, updateTaskDto);
    await this.em.persistAndFlush(task);
    return task;
  }

  async remove(id: number): Promise<{ message: string }> {
    const task = await this.em.findOne(Task, id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return {
      message: `Task with ID ${id} has been successfully deleted`,
    };
  }
}
