import { Migration } from '@mikro-orm/migrations';

export class Migration20241014104314 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "tab_accounts" add column "is_deleted" boolean not null default false;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "tab_accounts" drop column "is_deleted";`);
  }

}
