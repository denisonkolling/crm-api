import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

  async findAll() {
    return await this.em.find(Lead, {});
    //Return all leads with the campaign populated
    //return this.em.find(Lead, {}, { populate: ['campaign'] });
  }

  async findOne(id: number) {
    const lead = await this.em.findOne(Lead, id);
    if (!lead) {
      throw new NotFoundException(`Lead id: ${id} not found`);
    }
    return lead;
  }

  async update(id: number, updateLeadDto: UpdateLeadDto) {
    try {
      const lead = await this.em.findOne(Lead, id);

      if (!lead) {
        throw new NotFoundException(`Lead with ID ${id} not found`);
      }

      this.em.assign(lead, updateLeadDto);

      await this.em.persistAndFlush(lead);

      return {
        message: 'Lead successfully updated',
        lead,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update Lead with ID ${id}: ${error.message}`,
      );
    }
  }

  async remove(id: number) {
    const lead = await this.em.findOne(Lead, id);
    if (!lead) {
      throw new NotFoundException(`Lead id: ${id} not found`);
    }
    lead.isDeleted = true;
    await this.em.persistAndFlush(lead);
    return lead;
  }
}
