import { Migration } from '@mikro-orm/migrations';

export class Migration20241109190757 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "tab_users" add column "account_id" int null;`);

    this.addSql(`alter table "tab_accounts" add column "user_id" int null;`);
    this.addSql(`alter table "tab_accounts" add constraint "tab_accounts_user_id_foreign" foreign key ("user_id") references "tab_users" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "tab_leads" add column "contact_reference_id" int null, add column "account_reference_id" int null, add column "campaign_reference_id" int null;`);
    this.addSql(`alter table "tab_leads" add constraint "tab_leads_contact_id_foreign" foreign key ("contact_id") references "tab_contacts" ("id") on update cascade on delete set null;`);
    this.addSql(`alter table "tab_leads" add constraint "tab_leads_account_id_foreign" foreign key ("account_id") references "tab_accounts" ("id") on update cascade on delete set null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "tab_accounts" drop constraint "tab_accounts_user_id_foreign";`);

    this.addSql(`alter table "tab_leads" drop constraint "tab_leads_contact_id_foreign";`);
    this.addSql(`alter table "tab_leads" drop constraint "tab_leads_account_id_foreign";`);

    this.addSql(`alter table "tab_accounts" drop column "user_id";`);

    this.addSql(`alter table "tab_leads" drop column "contact_reference_id", drop column "account_reference_id", drop column "campaign_reference_id";`);

    this.addSql(`alter table "tab_users" drop column "account_id";`);
  }

}
