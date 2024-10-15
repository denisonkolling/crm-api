import { Migration } from '@mikro-orm/migrations';

export class Migration20241015103622 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "tab_contacts" add column "is_deleted" boolean not null default false;`);

    this.addSql(`alter table "tab_leads" add column "is_deleted" boolean not null default false;`);

    this.addSql(`alter table "tab_events" add column "is_deleted" boolean not null default false;`);

    this.addSql(`alter table "tab_opportunities" add column "is_deleted" boolean not null default false;`);

    this.addSql(`alter table "tab_tasks" add column "is_deleted" boolean not null default false;`);

    this.addSql(`alter table "tab_users" add column "is_deleted" boolean not null default false;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "tab_contacts" drop column "is_deleted";`);

    this.addSql(`alter table "tab_leads" drop column "is_deleted";`);

    this.addSql(`alter table "tab_events" drop column "is_deleted";`);

    this.addSql(`alter table "tab_opportunities" drop column "is_deleted";`);

    this.addSql(`alter table "tab_tasks" drop column "is_deleted";`);

    this.addSql(`alter table "tab_users" drop column "is_deleted";`);
  }

}
