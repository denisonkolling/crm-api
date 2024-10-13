import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Account } from '../../accounts/entities/account.entity';
import { Lead } from '../../leads/entities/lead.entity';

@Entity({tableName: 'tab_events'})
export class Event {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @Property()
  description!: string;

  @Property()
  location!: string;

  @Property()
  startTime!: Date;

  @Property()
  endTime!: Date;

  @ManyToOne(() => Account, { nullable: true })
  account?: Account;

  @ManyToOne(() => Lead, { nullable: true })
  lead?: Lead;
}
