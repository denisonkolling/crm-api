import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { Opportunity } from './entities/opportunity.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import { AccountsService } from '../accounts/accounts.service';
import { UserService } from '../users/user.service';
import { SearchOpportunityDto } from './dto/search-opportunity.dto';

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

  async findAll({ page, limit, sortBy, sortOrder }: { page: number; limit: number; sortBy: string; sortOrder: 'asc' | 'desc'; }): Promise<{ data: Opportunity[]; total: number; page: number; limit: number }> {
    // Calcular o offset baseado na página e limite
    const offset = (page - 1) * limit;

    // Buscar os dados e o total de oportunidades
    const [data, total] = await this.em.findAndCount(Opportunity, {}, {
      limit,
      offset,
      orderBy: { [sortBy]: sortOrder },
    });

    return { data, total, page,  limit };
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

  async search(searchDto: SearchOpportunityDto): Promise<{ data: Opportunity[]; total: number; page: number; limit: number }> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'id',
      sortOrder = 'desc',
      name,
      accountId,
      stage,
      createdDateStart,
      createdDateEnd,
      opportunityType,
      priority,
      probabilityMin,
      probabilityMax
    } = searchDto;

    // Construir query base
    const queryBuilder = this.em.createQueryBuilder(Opportunity, 'o')
      .select('*')
      .where({ isDeleted: false });

    // Adicionar filtros conforme parâmetros fornecidos
    if (name) {
      queryBuilder.andWhere({ name: { $like: `%${name}%` } });
    }

    if (accountId) {
      queryBuilder.andWhere({ account: accountId });
    }

    if (stage) {
      queryBuilder.andWhere({ stage });
    }

    if (createdDateStart || createdDateEnd) {
      const dateFilter: any = {};
      if (createdDateStart) {
        dateFilter.$gte = new Date(createdDateStart);
      }
      if (createdDateEnd) {
        dateFilter.$lte = new Date(createdDateEnd);
      }
      queryBuilder.andWhere({ createdDate: dateFilter });
    }

    if (opportunityType) {
      queryBuilder.andWhere({ opportunityType });
    }

    if (priority) {
      queryBuilder.andWhere({ priority });
    }

    if (probabilityMin || probabilityMax) {
      const probabilityFilter: any = {};
      if (probabilityMin) {
        probabilityFilter.$gte = probabilityMin;
      }
      if (probabilityMax) {
        probabilityFilter.$lte = probabilityMax;
      }
      queryBuilder.andWhere({ probability: probabilityFilter });
    }

    // Adicionar relacionamentos
    queryBuilder
      .leftJoinAndSelect('o.account', 'account')
      .leftJoinAndSelect('o.owner', 'owner');

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
