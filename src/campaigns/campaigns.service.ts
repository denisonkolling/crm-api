import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Campaign } from './entities/campaign.entity';
import { LeadsService } from 'src/leads/leads.service';
import { CampaignSearchParams } from './dto/search-campaign.dto';
import { PaginatedResponse } from 'src/common/dto/pagination.dto';
import { MapperUtil } from 'src/common/utils/mapper.util';
import { CampaignResponseDto } from './dto/response-campaign.dto';

@Injectable()
export class CampaignsService {

  constructor(
    private readonly em: EntityManager,
    @Inject(forwardRef(() => LeadsService))
    private readonly leadsService: LeadsService,
  ) { }

  async create(createCampaignDto: CreateCampaignDto) {
    console.log('createCampaignDto', createCampaignDto);
    const campaign = new Campaign();

    if (createCampaignDto.leadsReferenceId?.length) {
      const leads = await Promise.all(
        createCampaignDto.leadsReferenceId.map(lead => this.leadsService.findOne(lead))
      );
      campaign.leads.set(leads);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { leadsReferenceId, ...campaignData } = createCampaignDto;
    this.em.assign(campaign, campaignData);
    await this.em.persistAndFlush(campaign);

    // Garantir que os leads estão carregados antes de mapear
    await campaign.leads.init();

    const campaignResponseDto = MapperUtil.mapToDtoExcludeExtraneousValues(CampaignResponseDto, campaign);

    return campaignResponseDto;
  }

  async findAll() {
    return await this.em.find(Campaign, {});
    //Return all campaigns with the leads populated
    //return this.em.find(Campaign, {}, { populate: ['leads'] });
  }

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
