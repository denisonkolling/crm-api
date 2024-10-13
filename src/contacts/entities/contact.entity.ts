import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Account } from '../../accounts/entities/account.entity';

@Entity({ tableName: 'tab_contacts' })
export class Contact {
    @PrimaryKey()
    id!: number;

    @Property()
    firstName!: string;

    @Property()
    lastName!: string;

    @Property()
    email!: string;

    @Property()
    phone!: string;

    @ManyToOne(() => Account)
    account!: Account;
}