import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ADD COLUMN "figures_years" varchar DEFAULT '56+';
  ALTER TABLE "site_settings" ADD COLUMN "figures_staff_strength" varchar DEFAULT '100+';
  ALTER TABLE "site_settings" ADD COLUMN "figures_students" varchar DEFAULT '2.6K+';
  ALTER TABLE "site_settings" ADD COLUMN "figures_library_books" varchar DEFAULT '24K+';
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_figures_years" varchar DEFAULT '56+';
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_figures_staff_strength" varchar DEFAULT '100+';
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_figures_students" varchar DEFAULT '2.6K+';
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_figures_library_books" varchar DEFAULT '24K+';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" DROP COLUMN "figures_years";
  ALTER TABLE "site_settings" DROP COLUMN "figures_staff_strength";
  ALTER TABLE "site_settings" DROP COLUMN "figures_students";
  ALTER TABLE "site_settings" DROP COLUMN "figures_library_books";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_figures_years";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_figures_staff_strength";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_figures_students";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_figures_library_books";`)
}
