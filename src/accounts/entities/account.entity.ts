import { Entity, PrimaryKey, Property, OneToMany, Collection, ManyToOne } from '@mikro-orm/core';
import { Contact } from '../../contacts/entities/contact.entity';
import { User } from '../../users/entities/user.entity';

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

    @Property()
    isDeleted: boolean = false;

    // ----------------------------------------------------------------------------
    // ❓⚠️ This is a many-to-one relationship. An account can have one user only?
    // ----------------------------------------------------------------------------

    @ManyToOne(() => User, { nullable: true })
    user?: User;

}