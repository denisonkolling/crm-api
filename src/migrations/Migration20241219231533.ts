import { Migration } from '@mikro-orm/migrations';

export class Migration20241219231533 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`
      CREATE TYPE "CampaignStatus" AS ENUM (
          'Planned', 'Active', 'Completed', 'Archived',
          'Draft', 'Cancelled', 'Paused', 'Expired',
          'Failed', 'Under Review', 'Suspended', 'Testing'
      );
  `);

    // Alterar a coluna "status" para usar o tipo ENUM
    this.addSql(`
      ALTER TABLE "tab_campaigns"
      ALTER COLUMN "status" TYPE "CampaignStatus"
      USING ("status"::text::"CampaignStatus");
  `);

    this.addSql(`alter table "tab_users" drop column "account_id";`);

    this.addSql(`alter table "tab_leads" drop column "contact_reference_id", drop column "account_reference_id", drop column "campaign_reference_id";`);

    this.addSql(`alter table "tab_tasks" drop column "account_reference_id", drop column "lead_reference_id", drop column "opportunity_reference_id";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "tab_campaigns" alter column "status" type varchar(255) using ("status"::varchar(255));`);

    this.addSql(`alter table "tab_users" add column "account_id" int null;`);

    this.addSql(`alter table "tab_leads" add column "contact_reference_id" int null, add column "account_reference_id" int null, add column "campaign_reference_id" int null;`);

    this.addSql(`alter table "tab_tasks" add column "account_reference_id" int null, add column "lead_reference_id" int null, add column "opportunity_reference_id" int null;`);
  }

}
