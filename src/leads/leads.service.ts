import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Lead } from './entities/lead.entity';
import { CampaignsService } from 'src/campaigns/campaigns.service';
import { Campaign } from 'src/campaigns/entities/campaign.entity';
import { Contact } from 'src/contacts/entities/contact.entity';
import { ContactsService } from 'src/contacts/contacts.service';
import { AccountsService } from 'src/accounts/accounts.service';
import { Account } from 'src/accounts/entities/account.entity';
import { plainToClass } from 'class-transformer';
import { LeadResponseDto } from './dto/response-lead.dto';

@Injectable()
export class LeadsService {

  constructor(
    private readonly em: EntityManager,
    private readonly campaignsService: CampaignsService,
    private readonly contactsService: ContactsService,
    private readonly accountsService: AccountsService,
  ) { }


  async create(createLeadDto: CreateLeadDto) {
    const lead = new Lead();
    lead.account = await this.findAccountById(createLeadDto.accountId);
    lead.campaign = await this.findCampaignById(createLeadDto.campaignId);
    lead.contact = await this.findContactById(createLeadDto.contactId);
    //eslint-disable-next-line
    const { contactId, accountId, campaignId, ...leadData } = createLeadDto;
    this.em.assign(lead, leadData);
    await this.em.persistAndFlush(lead);
    const leadResponse = plainToClass(LeadResponseDto, lead, { excludeExtraneousValues: true, });
    return leadResponse;
  }

  async findAll() {
    return await this.em.find(Lead, {});
    //Return all leads with the campaign populated
    //return this.em.find(Lead, {}, { populate: ['campaign'] });
  }

  async findOne(id: number) {
    const lead = await this.em.findOne(Lead, id, { populate: ['contact', 'account', 'campaign'] });
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

  private async findAccountById(accountId?: number): Promise<Account | undefined> {
    if (!accountId) return undefined;
    return await this.accountsService.findOne(accountId);
  }

  private async findCampaignById(campaignId?: number): Promise<Campaign | undefined> {
    if (!campaignId) return undefined;
    return await this.campaignsService.findOne(campaignId);
  }

  private async findContactById(contactId?: number): Promise<Contact | undefined> {
    if (!contactId) return undefined;
    return await this.contactsService.findOne(contactId);
  }
}
