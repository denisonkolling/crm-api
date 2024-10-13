import { Migration } from '@mikro-orm/migrations';

export class Migration20241013094741 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "tab_tasks" ("id" serial primary key, "title" varchar(255) not null, "description" varchar(255) not null, "status" varchar(255) not null, "due_date" timestamptz not null, "account_id" int null, "lead_id" int null, "opportunity_id" int null);`);

    this.addSql(`alter table "tab_tasks" add constraint "tab_tasks_account_id_foreign" foreign key ("account_id") references "tab_accounts" ("id") on update cascade on delete set null;`);
    this.addSql(`alter table "tab_tasks" add constraint "tab_tasks_lead_id_foreign" foreign key ("lead_id") references "lead" ("id") on update cascade on delete set null;`);
    this.addSql(`alter table "tab_tasks" add constraint "tab_tasks_opportunity_id_foreign" foreign key ("opportunity_id") references "opportunity" ("id") on update cascade on delete set null;`);

    this.addSql(`drop table if exists "task" cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`create table "task" ("id" serial primary key, "title" varchar(255) not null, "description" varchar(255) not null, "status" varchar(255) not null, "due_date" timestamptz not null, "account_id" int null, "lead_id" int null, "opportunity_id" int null);`);

    this.addSql(`alter table "task" add constraint "task_account_id_foreign" foreign key ("account_id") references "tab_accounts" ("id") on update cascade on delete set null;`);
    this.addSql(`alter table "task" add constraint "task_lead_id_foreign" foreign key ("lead_id") references "lead" ("id") on update cascade on delete set null;`);
    this.addSql(`alter table "task" add constraint "task_opportunity_id_foreign" foreign key ("opportunity_id") references "opportunity" ("id") on update cascade on delete set null;`);

    this.addSql(`drop table if exists "tab_tasks" cascade;`);
  }

}
