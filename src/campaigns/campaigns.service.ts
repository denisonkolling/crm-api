import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Campaign } from './entities/campaign.entity';

@Injectable()
export class CampaignsService {

  constructor(
    private readonly em: EntityManager
  ) { }

  create(createCampaignDto: CreateCampaignDto) {
    return 'This action adds a new campaign';
  }

  findAll() {
    return `This action returns all campaigns`;
  }

  async findOne(id: number): Promise<Campaign> {
    const campaign = await this.em.findOne(Campaign, id);
    if (!campaign) {
      throw new NotFoundException(`Campaign id: ${id} not found`);
    }
    return campaign;
  }

  update(id: number, updateCampaignDto: UpdateCampaignDto) {
    return `This action updates a #${id} campaign`;
  }

  remove(id: number) {
    return `This action removes a #${id} campaign`;
  }
}
