import { Migration } from '@mikro-orm/migrations';

export class Migration20241013094300 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "contact" drop constraint "contact_account_id_foreign";`);

    this.addSql(`create table "tab_accounts" ("id" serial primary key, "name" varchar(255) not null, "industry" varchar(255) not null, "website" varchar(255) not null);`);

    this.addSql(`create table "campaign" ("id" serial primary key, "name" varchar(255) not null, "description" varchar(255) not null, "status" varchar(255) not null, "start_date" timestamptz not null, "end_date" timestamptz not null);`);

    this.addSql(`create table "tab_contacts" ("id" serial primary key, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "phone" varchar(255) not null, "account_id" int not null);`);

    this.addSql(`create table "lead" ("id" serial primary key, "name" varchar(255) not null, "company" varchar(255) not null, "email" varchar(255) not null, "status" varchar(255) not null, "campaign_id" int null);`);

    this.addSql(`create table "event" ("id" serial primary key, "title" varchar(255) not null, "description" varchar(255) not null, "location" varchar(255) not null, "start_time" timestamptz not null, "end_time" timestamptz not null, "account_id" int null, "lead_id" int null);`);

    this.addSql(`create table "opportunity" ("id" serial primary key, "name" varchar(255) not null, "amount" int not null, "stage" varchar(255) not null, "account_id" int not null);`);

    this.addSql(`create table "task" ("id" serial primary key, "title" varchar(255) not null, "description" varchar(255) not null, "status" varchar(255) not null, "due_date" timestamptz not null, "account_id" int null, "lead_id" int null, "opportunity_id" int null);`);

    this.addSql(`alter table "tab_contacts" add constraint "tab_contacts_account_id_foreign" foreign key ("account_id") references "tab_accounts" ("id") on update cascade;`);

    this.addSql(`alter table "lead" add constraint "lead_campaign_id_foreign" foreign key ("campaign_id") references "campaign" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "event" add constraint "event_account_id_foreign" foreign key ("account_id") references "tab_accounts" ("id") on update cascade on delete set null;`);
    this.addSql(`alter table "event" add constraint "event_lead_id_foreign" foreign key ("lead_id") references "lead" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "opportunity" add constraint "opportunity_account_id_foreign" foreign key ("account_id") references "tab_accounts" ("id") on update cascade;`);

    this.addSql(`alter table "task" add constraint "task_account_id_foreign" foreign key ("account_id") references "tab_accounts" ("id") on update cascade on delete set null;`);
    this.addSql(`alter table "task" add constraint "task_lead_id_foreign" foreign key ("lead_id") references "lead" ("id") on update cascade on delete set null;`);
    this.addSql(`alter table "task" add constraint "task_opportunity_id_foreign" foreign key ("opportunity_id") references "opportunity" ("id") on update cascade on delete set null;`);

    this.addSql(`drop table if exists "account" cascade;`);

    this.addSql(`drop table if exists "contact" cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "tab_contacts" drop constraint "tab_contacts_account_id_foreign";`);

    this.addSql(`alter table "event" drop constraint "event_account_id_foreign";`);

    this.addSql(`alter table "opportunity" drop constraint "opportunity_account_id_foreign";`);

    this.addSql(`alter table "task" drop constraint "task_account_id_foreign";`);

    this.addSql(`alter table "lead" drop constraint "lead_campaign_id_foreign";`);

    this.addSql(`alter table "event" drop constraint "event_lead_id_foreign";`);

    this.addSql(`alter table "task" drop constraint "task_lead_id_foreign";`);

    this.addSql(`alter table "task" drop constraint "task_opportunity_id_foreign";`);

    this.addSql(`create table "account" ("id" serial primary key, "name" varchar(255) not null, "industry" varchar(255) not null, "website" varchar(255) not null);`);

    this.addSql(`create table "contact" ("id" serial primary key, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "phone" varchar(255) not null, "account_id" int not null);`);

    this.addSql(`alter table "contact" add constraint "contact_account_id_foreign" foreign key ("account_id") references "account" ("id") on update cascade;`);

    this.addSql(`drop table if exists "tab_accounts" cascade;`);

    this.addSql(`drop table if exists "campaign" cascade;`);

    this.addSql(`drop table if exists "tab_contacts" cascade;`);

    this.addSql(`drop table if exists "lead" cascade;`);

    this.addSql(`drop table if exists "event" cascade;`);

    this.addSql(`drop table if exists "opportunity" cascade;`);

    this.addSql(`drop table if exists "task" cascade;`);
  }

}
