import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/core';
import { Lead } from '../../leads/entities/lead.entity';
import { IsEnum } from 'class-validator';
import { CampaignStatus } from '../enums/campaign-status.enum';

@Entity({ tableName: 'tab_campaigns' })
export class Campaign {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property()
    description!: string;

    @Property()
    @IsEnum(CampaignStatus, { message: 'Planned, Active, Completed, Archived, Draft, Cancelled, Paused, Expired, Failed, Under Review, Suspended, Testing' })
    status!: CampaignStatus;

    @Property()
    startDate!: Date;

    @Property()
    endDate!: Date;

    @OneToMany(() => Lead, lead => lead.campaign)
    leads = new Collection<Lead>(this);
}
