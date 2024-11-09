import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Event } from './entities/event.entity';
import { AccountsService } from 'src/accounts/accounts.service';
import { LeadsService } from 'src/leads/leads.service';
import { Lead } from 'src/leads/entities/lead.entity';
import { Account } from 'src/accounts/entities/account.entity';

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



  async findAll(): Promise<Event[]> {
    return await this.em.find(Event, {});
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

}
