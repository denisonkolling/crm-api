import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { Opportunity } from './entities/opportunity.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import { AccountsService } from '../accounts/accounts.service';
import { UserService } from '../users/user.service';

@Injectable()
export class OpportunitiesService {

  constructor(
    private readonly em: EntityManager,
    private readonly accountsService: AccountsService,
    private readonly userService: UserService
  ) { }

  async create(createOpportunityDto: CreateOpportunityDto): Promise<Opportunity> {
    const opportunity = new Opportunity();

    if (createOpportunityDto.accountId) {
      opportunity.account = await this.accountsService.findOne(createOpportunityDto.accountId);
    }

    if (createOpportunityDto.ownerId) {
      opportunity.owner = await this.userService.findOne(createOpportunityDto.ownerId);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { accountId, ownerId, ...dtoWithoutIds } = createOpportunityDto;

    this.em.assign(opportunity, dtoWithoutIds);
    await this.em.persistAndFlush(opportunity);
    return opportunity;
  }

  async findAll(): Promise<Opportunity[]> {
    return await this.em.find(Opportunity, {});
  }

  async findOne(id: number): Promise<Opportunity> {
    const opportunity = await this.em.findOne(Opportunity, id);
    if (!opportunity) {
      throw new NotFoundException(`Opportunity with ID ${id} not found`);
    }
    return opportunity;
  }

  async update(id: number, updateOpportunityDto: UpdateOpportunityDto): Promise<Opportunity> {
    const opportunity = await this.em.findOne(Opportunity, id);
    this.em.assign(opportunity, updateOpportunityDto);
    await this.em.persistAndFlush(opportunity);
    return opportunity;
  }

  async remove(id: number): Promise<{ message: string }> {
    const opportunity = await this.em.findOne(Opportunity, id);
    if (!opportunity) {
      throw new NotFoundException(`Opportunity with ID ${id} not found`);
    }
    opportunity.isDeleted = true;
    await this.em.persistAndFlush(opportunity);
    
    return { message: 'Opportunity successfully deleted' };
  }
}
