import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Campaign } from '../../campaigns/entities/campaign.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { Account } from '../../accounts/entities/account.entity';

@Entity({ tableName: 'tab_leads' })
export class Lead {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ nullable: true })
  leadType?: string; // e.g., Customer, Partner, Vendor, etc.

  @Property()
  status!: string; // e.g., New, Contacted, Qualified, etc.

  @Property({ nullable: true })
  contactReferenceId?: number;

  @Property({ nullable: true })
  accountReferenceId?: number;

  @Property({ nullable: true })
  campaignReferenceId?: number;

  @ManyToOne(() => Contact, { nullable: true })
  contact?: Contact;

  @ManyToOne(() => Account, { nullable: true })
  account?: Account;

  @ManyToOne(() => Campaign, { nullable: true })
  campaign?: Campaign;

  @Property()
  isDeleted: boolean = false;
}

