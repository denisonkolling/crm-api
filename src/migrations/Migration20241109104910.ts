import { Migration } from '@mikro-orm/migrations';

export class Migration20241109104910 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "tab_contacts" drop constraint "tab_contacts_account_id_foreign";`);

    this.addSql(`alter table "tab_users" drop constraint "tab_users_account_id_foreign";`);

    this.addSql(`alter table "tab_contacts" alter column "account_id" type int using ("account_id"::int);`);
    this.addSql(`alter table "tab_contacts" alter column "account_id" drop not null;`);
    this.addSql(`alter table "tab_contacts" add constraint "tab_contacts_account_id_foreign" foreign key ("account_id") references "tab_accounts" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "tab_leads" drop column "company", drop column "email";`);

    this.addSql(`alter table "tab_leads" add column "lead_type" varchar(255) null, add column "contact_id" int null, add column "account_id" int null;`);

    this.addSql(`alter table "tab_events" add column "account_reference_id" int null, add column "lead_reference_id" int null;`);

    this.addSql(`alter table "tab_users" drop column "account_id";`);

    this.addSql(`alter table "tab_users" add column "password" varchar(255) not null;`);

    this.addSql(`alter table "tab_tasks" add column "account_reference_id" int null, add column "lead_reference_id" int null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "tab_contacts" drop constraint "tab_contacts_account_id_foreign";`);

    this.addSql(`alter table "tab_contacts" alter column "account_id" type int using ("account_id"::int);`);
    this.addSql(`alter table "tab_contacts" alter column "account_id" set not null;`);
    this.addSql(`alter table "tab_contacts" add constraint "tab_contacts_account_id_foreign" foreign key ("account_id") references "tab_accounts" ("id") on update cascade;`);

    this.addSql(`alter table "tab_leads" drop column "lead_type", drop column "contact_id", drop column "account_id", drop column "contact", drop column "account";`);

    this.addSql(`alter table "tab_leads" add column "company" varchar(255) not null, add column "email" varchar(255) not null;`);

    this.addSql(`alter table "tab_events" drop column "account_reference_id", drop column "lead_reference_id";`);

    this.addSql(`alter table "tab_users" drop column "password";`);

    this.addSql(`alter table "tab_users" add column "account_id" int null;`);
    this.addSql(`alter table "tab_users" add constraint "tab_users_account_id_foreign" foreign key ("account_id") references "tab_accounts" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "tab_tasks" drop column "account_reference_id", drop column "lead_reference_id";`);
  }

}
