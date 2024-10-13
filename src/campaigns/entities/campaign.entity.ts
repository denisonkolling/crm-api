import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/core';
import { Lead } from '../../leads/entities/lead.entity';

@Entity({ tableName: 'tab_campaigns' })
export class Campaign {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property()
    description!: string;

    @Property()
    status!: string; // e.g., Planned, Active, Completed, Archived

    @Property()
    startDate!: Date;

    @Property()
    endDate!: Date;

    @OneToMany(() => Lead, lead => lead.campaign)
    leads = new Collection<Lead>(this);
}
