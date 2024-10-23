import { Injectable } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Lead } from './entities/lead.entity';
import { CampaignsService } from 'src/campaigns/campaigns.service';

@Injectable()
export class LeadsService {

  constructor(
    private readonly em: EntityManager,
    private readonly campaignsService: CampaignsService
  ) { }

  async create(createLeadDto: CreateLeadDto) {
    const lead = new Lead();

    if (createLeadDto.campaign) {
      lead.campaign = await this.campaignsService.findOne(createLeadDto.campaign.id);
    }
    this.em.assign(lead, createLeadDto);
    await this.em.persistAndFlush(lead);
    return lead;
  }

  findAll() {
    return `This action returns all leads`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lead`;
  }

  update(id: number, updateLeadDto: UpdateLeadDto) {
    return `This action updates a #${id} lead`;
  }

  remove(id: number) {
    return `This action removes a #${id} lead`;
  }
}
