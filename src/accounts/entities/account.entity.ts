import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/core';
import { Contact } from '../../contacts/entities/contact.entity';

@Entity({ tableName: 'tab_accounts' })
export class Account {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property()
    industry!: string;

    @Property()
    website!: string;

    @OneToMany(() => Contact, contact => contact.account)
    contacts = new Collection<Contact>(this);
}