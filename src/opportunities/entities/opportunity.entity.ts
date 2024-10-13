import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Account } from '../../accounts/entities/account.entity';


@Entity({tableName: 'tab_opportunities'})
export class Opportunity {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property()
    amount!: number;

    @Property()
    stage!: string; // e.g., Prospecting, Qualification, Closed Won, Closed Lost

    @ManyToOne(() => Account)
    account!: Account;
}