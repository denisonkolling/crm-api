import { Migration } from '@mikro-orm/migrations';

export class Migration20241013092625 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "account" ("id" serial primary key, "name" varchar(255) not null, "industry" varchar(255) not null, "website" varchar(255) not null);`);

    this.addSql(`create table "contact" ("id" serial primary key, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "phone" varchar(255) not null, "account_id" int not null);`);

    this.addSql(`alter table "contact" add constraint "contact_account_id_foreign" foreign key ("account_id") references "account" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "contact" drop constraint "contact_account_id_foreign";`);

    this.addSql(`drop table if exists "account" cascade;`);

    this.addSql(`drop table if exists "contact" cascade;`);
  }

}
