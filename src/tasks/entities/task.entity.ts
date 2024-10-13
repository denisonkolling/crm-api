import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Account } from '../../accounts/entities/account.entity';
import { Lead } from '../../leads/entities/lead.entity';
import { Opportunity } from '../../opportunities/entities/opportunity.entity';

@Entity({ tableName: 'tab_tasks' })
export class Task {
    @PrimaryKey()
    id!: number;

    @Property()
    title!: string;

    @Property()
    description!: string;

    @Property()
    status!: string; // e.g., Pending, Completed, In Progress

    @Property()
    dueDate!: Date;

    @ManyToOne(() => Account, { nullable: true })
    account?: Account;

    @ManyToOne(() => Lead, { nullable: true })
    lead?: Lead;

    @ManyToOne(() => Opportunity, { nullable: true })
    opportunity?: Opportunity;
}