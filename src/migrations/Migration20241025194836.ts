import { Migration } from '@mikro-orm/migrations';

export class Migration20241025194836 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "tab_opportunities" add column "description" varchar(255) null, add column "created_date" timestamptz null, add column "expected_close_date" timestamptz null, add column "actual_close_date" timestamptz null, add column "probability" int null, add column "opportunity_type" varchar(255) null, add column "lead_source" varchar(255) null, add column "owner_id" int null, add column "main_competitor" varchar(255) null, add column "priority" varchar(255) null, add column "product_category" varchar(255) null, add column "follow_up_status" varchar(255) null;`);
    this.addSql(`alter table "tab_opportunities" add constraint "tab_opportunities_owner_id_foreign" foreign key ("owner_id") references "tab_users" ("id") on update cascade on delete set null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "tab_opportunities" drop constraint "tab_opportunities_owner_id_foreign";`);

    this.addSql(`alter table "tab_opportunities" drop column "description", drop column "created_date", drop column "expected_close_date", drop column "actual_close_date", drop column "probability", drop column "opportunity_type", drop column "lead_source", drop column "owner_id", drop column "main_competitor", drop column "priority", drop column "product_category", drop column "follow_up_status";`);
  }

}
