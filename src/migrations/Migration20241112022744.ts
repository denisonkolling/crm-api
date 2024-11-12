import { Migration } from '@mikro-orm/migrations';

export class Migration20241112022744 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "tab_tags" ("id" serial primary key, "name" varchar(255) not null, "color" varchar(255) not null default '#000000');`);

    this.addSql(`create table "tab_taggables" ("id" serial primary key, "tag_id" int not null, "entity_type" varchar(255) not null, "entity_id" int not null);`);

    this.addSql(`alter table "tab_tasks" add column "opportunity_reference_id" int null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "tab_tags" cascade;`);

    this.addSql(`drop table if exists "tab_taggables" cascade;`);

    this.addSql(`alter table "tab_tasks" drop column "opportunity_reference_id";`);
  }

}
