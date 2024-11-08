import { Migration } from '@mikro-orm/migrations';

export class Migration20241108004012 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "tab_opportunities" drop constraint "tab_opportunities_account_id_foreign";`);

    this.addSql(`alter table "tab_opportunities" alter column "account_id" type int using ("account_id"::int);`);
    this.addSql(`alter table "tab_opportunities" alter column "account_id" drop not null;`);
    this.addSql(`alter table "tab_opportunities" add constraint "tab_opportunities_account_id_foreign" foreign key ("account_id") references "tab_accounts" ("id") on update cascade on delete set null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "tab_opportunities" drop constraint "tab_opportunities_account_id_foreign";`);

    this.addSql(`alter table "tab_opportunities" alter column "account_id" type int using ("account_id"::int);`);
    this.addSql(`alter table "tab_opportunities" alter column "account_id" set not null;`);
    this.addSql(`alter table "tab_opportunities" add constraint "tab_opportunities_account_id_foreign" foreign key ("account_id") references "tab_accounts" ("id") on update cascade;`);
  }

}
