import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Campaign } from './entities/campaign.entity';
import { LeadsService } from 'src/leads/leads.service';
import { CampaignSearchParams } from './dto/search-campaign.dto';

@Injectable()
export class CampaignsService {

  constructor(
    private readonly em: EntityManager,
    @Inject(forwardRef(() => LeadsService))
    private readonly leadsService: LeadsService,
  ) { }

  async create(createCampaignDto: CreateCampaignDto) {
    const campaign = new Campaign();

    if (createCampaignDto.leads) {
      const leads = await Promise.all(
        createCampaignDto.leads.map(lead => this.leadsService.findOne(lead.id))
      );
      campaign.leads.add(...(leads as [typeof leads[0]]));
    }

    this.em.assign(campaign, createCampaignDto);
    await this.em.persistAndFlush(campaign);
    return campaign;
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

  async search(searchParams: CampaignSearchParams): Promise<{
    data: Campaign[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'id',
      name,
      status,
      startDate,
      endDate,
      sortOrder = 'ASC',
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

    // Ordenação
    if (sortBy) {
      qb.orderBy({ [`c.${sortBy}`]: sortOrder });
    }

    // Calcular offset baseado na página
    const offset = (page - 1) * limit;

    // Executar query com contagem
    const [results, total] = await qb
      .limit(limit)
      .offset(offset)
      .getResultAndCount();

    // Calcular metadata da paginação
    const totalPages = Math.ceil(total / limit);

    return {
      data: results,
      total,
      page,
      totalPages
    }
  };
}

//Metodo Create Com Trata de Erros e Loggers
// async create(createCampaignDto: CreateCampaignDto): Promise<Campaign> {
//   try {

//     if (!createCampaignDto) {
//       throw new BadRequestException('Campaign data is required');
//     }

//     const campaign = await this.em.transactional(async (em) => {
//       const campaign = new Campaign();

//       if (createCampaignDto.leads?.length) {
//         try {
//           const leads = await Promise.all(
//             createCampaignDto.leads.map(async (lead) => {
//               const foundLead = await this.leadsService.findOne(lead.id);
//               if (!foundLead) {
//                 throw new NotFoundException(`Lead with ID ${lead.id} not found`);
//               }
//               return foundLead;
//             })
//           );

//           campaign.leads.add(...(leads as [typeof leads[0]]));
//         } catch (error) {
//           if (error instanceof NotFoundException) {
//             throw error;
//           }
//           throw new BadRequestException('Error processing leads');
//         }
//       }

//       em.assign(campaign, createCampaignDto);
//       await em.persistAndFlush(campaign);

//       return campaign;
//     });

//     return campaign;

//   } catch (error) {
//     this.logger.error('Error creating campaign:', error);

//     if (error instanceof BadRequestException ||
//       error instanceof NotFoundException) {
//       throw error;
//     }

//     throw new InternalServerErrorException('Error creating campaign');
//   }
// }

