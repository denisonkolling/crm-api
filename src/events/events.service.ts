import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Event } from './entities/event.entity';
import { AccountsService } from 'src/accounts/accounts.service';
import { LeadsService } from 'src/leads/leads.service';
import { Lead } from 'src/leads/entities/lead.entity';
import { Account } from 'src/accounts/entities/account.entity';
import { SearchEventDto } from './dto/search-event.dto';

@Injectable()
export class EventsService {

  constructor(
    private readonly em: EntityManager,
    private readonly accountsService: AccountsService,
    private readonly leadsService: LeadsService,
  ) { }

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const event = new Event();
    event.account = await this.findAccountById(createEventDto.accountReferenceId);
    event.lead = await this.findLeadById(createEventDto.leadReferenceId);
    this.em.assign(event, createEventDto);
    await this.em.persistAndFlush(event);
    return event;
  }

  async findAll({ page, limit, sortBy, sortOrder }: { page: number; limit: number; sortBy: string; sortOrder: 'asc' | 'desc'; }): Promise<{ data: Event[]; total: number; page: number; limit: number }> {
    const offset = (page - 1) * limit;

    const [data, total] = await this.em.findAndCount(Event, {}, {
      limit,
      offset,
      orderBy: { [sortBy]: sortOrder },
    });

    return { data, total, page, limit };
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.em.findOne(Event, id);
    //eslint-disable-next-line
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.em.findOne(Event, id);
    this.em.assign(event, updateEventDto);
    await this.em.persistAndFlush(event);
    return event;
  }

  remove(id: number): Promise<number> {
    return this.em.nativeDelete(Event, id);
  }

  private async findAccountById(accountReferenceId?: number): Promise<Account | undefined> {
    if (!accountReferenceId) return undefined;
    return await this.accountsService.findOne(accountReferenceId);
  }

  private async findLeadById(leadReferenceId?: number): Promise<Lead | undefined> {
    if (!leadReferenceId) return undefined;
    return await this.leadsService.findOne(leadReferenceId);
  }

  async search(searchDto: SearchEventDto): Promise<{ data: Event[]; total: number; page: number; limit: number }> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'id',
      sortOrder = 'desc',
      name,
      description,
      location,
      startTime,
      endTime,
      accountId,
      leadId
    } = searchDto;

    // Construir query base
    const queryBuilder = this.em.createQueryBuilder(Event, 'e')
      .select('*')
      .where({ isDeleted: false });

    // Adicionar filtros conforme parâmetros fornecidos
    if (name) {
      queryBuilder.andWhere({ name: { $like: `%${name}%` } });
    }

    if (description) {
      queryBuilder.andWhere({ description: { $like: `%${description}%` } });
    }

    if (location) {
      queryBuilder.andWhere({ location: { $like: `%${location}%` } });
    }

    if (startTime || endTime) {
      const timeFilter: any = {};
      if (startTime) {
        timeFilter.$gte = new Date(startTime);
      }
      if (endTime) {
        timeFilter.$lte = new Date(endTime);
      }
      queryBuilder.andWhere({ eventTime: timeFilter });
    }

    if (accountId) {
      queryBuilder.andWhere({ account: accountId });
    }

    if (leadId) {
      queryBuilder.andWhere({ lead: leadId });
    }

    // Adicionar relacionamentos
    queryBuilder
      .leftJoinAndSelect('e.account', 'account')
      .leftJoinAndSelect('e.lead', 'lead');

    // Calcular total antes da paginação
    const total = await queryBuilder.getCount();

    // Adicionar ordenação e paginação
    const offset = (page - 1) * limit;
    queryBuilder
      .orderBy({ [sortBy]: sortOrder })
      .offset(offset)
      .limit(limit);

    // Executar query
    const data = await queryBuilder.getResult();

    return {
      data,
      total,
      page,
      limit
    };
  }

}
