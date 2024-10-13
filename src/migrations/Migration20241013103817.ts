import { Migration } from '@mikro-orm/migrations';

export class Migration20241013103817 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "tab_accounts" ("id" serial primary key, "name" varchar(255) not null, "industry" varchar(255) not null, "website" varchar(255) not null);`);

    this.addSql(`create table "tab_campaigns" ("id" serial primary key, "name" varchar(255) not null, "description" varchar(255) not null, "status" varchar(255) not null, "start_date" timestamptz not null, "end_date" timestamptz not null);`);

    this.addSql(`create table "tab_contacts" ("id" serial primary key, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "phone" varchar(255) not null, "account_id" int not null);`);

    this.addSql(`create table "tab_leads" ("id" serial primary key, "name" varchar(255) not null, "company" varchar(255) not null, "email" varchar(255) not null, "status" varchar(255) not null, "campaign_id" int null);`);

    this.addSql(`create table "tab_events" ("id" serial primary key, "title" varchar(255) not null, "description" varchar(255) not null, "location" varchar(255) not null, "start_time" timestamptz not null, "end_time" timestamptz not null, "account_id" int null, "lead_id" int null);`);

    this.addSql(`create table "tab_opportunities" ("id" serial primary key, "name" varchar(255) not null, "amount" int not null, "stage" varchar(255) not null, "account_id" int not null);`);

    this.addSql(`create table "tab_tasks" ("id" serial primary key, "title" varchar(255) not null, "description" varchar(255) not null, "status" varchar(255) not null, "due_date" timestamptz not null, "account_id" int null, "lead_id" int null, "opportunity_id" int null);`);

    this.addSql(`create table "tab_users" ("id" serial primary key, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "phone" varchar(255) not null, "account_id" int null);`);

    this.addSql(`alter table "tab_contacts" add constraint "tab_contacts_account_id_foreign" foreign key ("account_id") references "tab_accounts" ("id") on update cascade;`);

    this.addSql(`alter table "tab_leads" add constraint "tab_leads_campaign_id_foreign" foreign key ("campaign_id") references "tab_campaigns" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "tab_events" add constraint "tab_events_account_id_foreign" foreign key ("account_id") references "tab_accounts" ("id") on update cascade on delete set null;`);
    this.addSql(`alter table "tab_events" add constraint "tab_events_lead_id_foreign" foreign key ("lead_id") references "tab_leads" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "tab_opportunities" add constraint "tab_opportunities_account_id_foreign" foreign key ("account_id") references "tab_accounts" ("id") on update cascade;`);

    this.addSql(`alter table "tab_tasks" add constraint "tab_tasks_account_id_foreign" foreign key ("account_id") references "tab_accounts" ("id") on update cascade on delete set null;`);
    this.addSql(`alter table "tab_tasks" add constraint "tab_tasks_lead_id_foreign" foreign key ("lead_id") references "tab_leads" ("id") on update cascade on delete set null;`);
    this.addSql(`alter table "tab_tasks" add constraint "tab_tasks_opportunity_id_foreign" foreign key ("opportunity_id") references "tab_opportunities" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "tab_users" add constraint "tab_users_account_id_foreign" foreign key ("account_id") references "tab_accounts" ("id") on update cascade on delete set null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "tab_contacts" drop constraint "tab_contacts_account_id_foreign";`);

    this.addSql(`alter table "tab_events" drop constraint "tab_events_account_id_foreign";`);

    this.addSql(`alter table "tab_opportunities" drop constraint "tab_opportunities_account_id_foreign";`);

    this.addSql(`alter table "tab_tasks" drop constraint "tab_tasks_account_id_foreign";`);

    this.addSql(`alter table "tab_users" drop constraint "tab_users_account_id_foreign";`);

    this.addSql(`alter table "tab_leads" drop constraint "tab_leads_campaign_id_foreign";`);

    this.addSql(`alter table "tab_events" drop constraint "tab_events_lead_id_foreign";`);

    this.addSql(`alter table "tab_tasks" drop constraint "tab_tasks_lead_id_foreign";`);

    this.addSql(`alter table "tab_tasks" drop constraint "tab_tasks_opportunity_id_foreign";`);

    this.addSql(`drop table if exists "tab_accounts" cascade;`);

    this.addSql(`drop table if exists "tab_campaigns" cascade;`);

    this.addSql(`drop table if exists "tab_contacts" cascade;`);

    this.addSql(`drop table if exists "tab_leads" cascade;`);

    this.addSql(`drop table if exists "tab_events" cascade;`);

    this.addSql(`drop table if exists "tab_opportunities" cascade;`);

    this.addSql(`drop table if exists "tab_tasks" cascade;`);

    this.addSql(`drop table if exists "tab_users" cascade;`);
  }

}
