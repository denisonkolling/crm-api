import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Campaign } from './entities/campaign.entity';
import { LeadsService } from 'src/leads/leads.service';
import { CampaignSearchParams } from './dto/search-campaign.dto';
import { PaginatedResponse } from 'src/common/dto/pagination.dto';

@Injectable()
export class CampaignsService {

  constructor(
    private readonly em: EntityManager,
    @Inject(forwardRef(() => LeadsService))
    private readonly leadsService: LeadsService,
  ) { }

  async create(createDto: CreateCampaignDto) {
    const { leads, ...campaignData } = createDto;
    const campaign = new Campaign();

    this.em.assign(campaign, campaignData);

    if (leads && leads.length > 0) {
      const foundLeads = await Promise.all(
        leads.map(lead => this.leadsService.findOne(lead))
      );
      campaign.leads.set(foundLeads);
    }

    await this.em.persistAndFlush(campaign);

    return campaign;
  }


  async findAll({ page, limit, sortBy, sortOrder }: { page: number; limit: number; sortBy: string; sortOrder: 'asc' | 'desc'; }): Promise<{ data: Campaign[]; total: number; page: number; limit: number }> {
    const offset = (page - 1) * limit;

    const [data, total] = await this.em.findAndCount(Campaign, {}, {
      limit,
      offset,
      orderBy: { [sortBy]: sortOrder },
    });

    return { data, total, page, limit };
  }

  //Old FindAll method
  //async findAll() {
  // return await this.em.find(Campaign, {});
  //Return all campaigns with the leads populated
  //return this.em.find(Campaign, {}, { populate: ['leads'] });
  //}

  async findOne(id: number): Promise<Campaign> {
    const campaign = await this.em.findOne(Campaign, id, { populate: ['leads'] });
    if (!campaign) {
      throw new NotFoundException(`Campaign id: ${id} not found`);
    }
    return campaign;
  }

  update(id: number, updateCampaignDto: UpdateCampaignDto) {
    try {
      const campaign = this.em.findOne(Campaign, id);

      if (!campaign) {
        throw new NotFoundException(`Campaign with ID ${id} not found`);
      }

      this.em.assign(campaign, updateCampaignDto);
      this.em.persistAndFlush(campaign);

      return {
        message: 'Campaign successfully updated',
        campaign,
      };
    } catch (error) {
      throw new Error(`Failed to update Campaign with ID ${id}: ${error.message}`);
    }
  }

  remove(id: number) {
    const campaign = this.em.findOne(Campaign, id);
    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }

    this.em.removeAndFlush(campaign);

    return {
      message: 'Campaign successfully removed',
    };
  }

  async search(searchParams: CampaignSearchParams): Promise<PaginatedResponse<Campaign>> {
    const {
      name,
      status,
      startDate,
      endDate,
      hasActiveLeads,
      sortBy,
      sortOrder = 'ASC',
      page = 1,
      pageSize = 10,
    } = searchParams;

    const qb = this.em.createQueryBuilder(Campaign, 'c');

    // Aplicar filtros
    if (name) {
      qb.andWhere({ name: { $ilike: `%${name}%` } });
    }

    if (status) {
      qb.andWhere({ status });
    }

    if (startDate) {
      qb.andWhere({ startDate: { $gte: startDate } });
    }

    if (endDate) {
      qb.andWhere({ endDate: { $lte: endDate } });
    }

    if (hasActiveLeads) {
      qb.leftJoinAndSelect('c.leads', 'leads')
        .andWhere({ 'leads.status': 'active' });
    }

    // Ordenação
    if (sortBy) {
      qb.orderBy({ [`c.${sortBy}`]: sortOrder });
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
}
