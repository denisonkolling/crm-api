import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Campaign } from '../../campaigns/entities/campaign.entity';

@Entity({ tableName: 'tab_leads' })
export class Lead {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property()
    company!: string;

    @Property()
    email!: string;

    @Property()
    status!: string; // e.g., New, Contacted, Qualified, etc.

    @ManyToOne(() => Campaign, { nullable: true })
    campaign?: Campaign;

    @Property()
    isDeleted: boolean = false;
}

