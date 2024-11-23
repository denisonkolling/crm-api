import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import { AccountsService } from 'src/accounts/accounts.service';
import { LeadsService } from 'src/leads/leads.service';
import { OpportunitiesService } from 'src/opportunities/opportunities.service';
import { TaskResponseDto } from './dto/response-task.dto';
import { MapperUtil } from 'src/common/utils/mapper.util';
import { SearchTaskDto } from './dto/search-task.dto';
import { PaginatedResponse } from 'src/common/dto/pagination.dto';

@Injectable()
export class TasksService {

  constructor(
    private readonly em: EntityManager,
    private readonly accountsService: AccountsService,
    private readonly leadsService: LeadsService,
    private readonly opportunityService: OpportunitiesService,

  ) { }

  async create(createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    const task = new Task();

    const [account, lead, opportunity] = await Promise.all([
      this.findAccountById(createTaskDto.accountReferenceId),
      this.findLeadById(createTaskDto.leadReferenceId),
      this.findOpportunityById(createTaskDto.opportunityReferenceId)
    ]);

    task.account = account;
    task.lead = lead;
    task.opportunity = opportunity;

    this.em.assign(task, createTaskDto);
    await this.em.persistAndFlush(task);

    const taskResponseDto = MapperUtil.mapToDtoExcludeExtraneousValues(TaskResponseDto, task);

    return taskResponseDto;

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

  async search(searchTaskDto: SearchTaskDto): Promise<PaginatedResponse<Task>> {
    const { sortBy,
      sortOrder = 'ASC',
      page = 1,
      pageSize = 10,
      ...searchParams } = searchTaskDto;

    const qb = this.em.createQueryBuilder(Task);

    if (searchParams.accountReferenceId) {
      qb.andWhere({ account: searchParams.accountReferenceId });
    }

    if (searchParams.leadReferenceId) {
      qb.andWhere({ lead: searchParams.leadReferenceId });
    }

    if (searchParams.opportunityReferenceId) {
      qb.andWhere({ opportunity: searchParams.opportunityReferenceId });
    }

    if (searchParams.status) {
      qb.andWhere({ status: searchParams.status });
    }

    if (searchParams.dueDate) {
      qb.andWhere({ dueDate: searchParams.dueDate });
    }

    if (sortBy) {
      qb.orderBy({ [sortBy]: sortOrder });
    }

    // Calcular offset baseado na página
    const offset = (page - 1) * pageSize;

    // Executar query com contagem
    const [results, total] = await qb
      .limit(pageSize)
      .offset(offset)
      .getResultAndCount();

    // Calcular metadata da paginação
    const totalPages = Math.ceil(total / pageSize);

    return {
      data: results,
      meta: {
        total,
        page,
        pageSize,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      }
    };
  }

  private async findAccountById(accountId?: number) {
    if (!accountId) return undefined;
    return await this.accountsService.findOne(accountId);
  }

  private async findLeadById(leadId?: number) {
    if (!leadId) return undefined;
    return await this.leadsService.findOne(leadId);
  }

  private async findOpportunityById(opportunityId?: number) {
    if (!opportunityId) return undefined;
    return await this.opportunityService.findOne(opportunityId);
  }

}
