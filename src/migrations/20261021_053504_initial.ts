import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_kind" AS ENUM('builtIn', 'custom');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_kind" AS ENUM('builtIn', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_site_settings_footer_social_platform" AS ENUM('Facebook', 'Instagram', 'YouTube', 'X', 'LinkedIn', 'WhatsApp');
  CREATE TYPE "public"."enum_site_settings_announcement_tone" AS ENUM('info', 'important');
  CREATE TYPE "public"."enum__site_settings_v_version_footer_social_platform" AS ENUM('Facebook', 'Instagram', 'YouTube', 'X', 'LinkedIn', 'WhatsApp');
  CREATE TYPE "public"."enum__site_settings_v_version_announcement_tone" AS ENUM('info', 'important');
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"path" varchar,
  	"kind" "enum_pages_kind" DEFAULT 'custom',
  	"content" jsonb,
  	"schema_version" numeric DEFAULT 1,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_no_index" boolean,
  	"seo_canonical" varchar,
  	"published_at" timestamp(3) with time zone,
  	"updated_by_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_path" varchar,
  	"version_kind" "enum__pages_v_version_kind" DEFAULT 'custom',
  	"version_content" jsonb,
  	"version_schema_version" numeric DEFAULT 1,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_no_index" boolean,
  	"version_seo_canonical" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_by_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"label" varchar,
  	"folder" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to" varchar NOT NULL,
  	"permanent" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"media_id" integer,
  	"users_id" integer,
  	"redirects_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_contact_phones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_contact_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_navigation_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"external" boolean
  );
  
  CREATE TABLE "site_settings_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"external" boolean,
  	"summary" varchar
  );
  
  CREATE TABLE "site_settings_footer_quick_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_footer_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_footer_social_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"identity_name" varchar DEFAULT 'Sacred Heart Sr. Sec. School' NOT NULL,
  	"identity_full_name" varchar DEFAULT 'Sacred Heart Senior Secondary School' NOT NULL,
  	"identity_tagline" varchar DEFAULT 'Nurturing Hearts, Shaping Futures',
  	"identity_affiliation" varchar DEFAULT 'CISCE, New Delhi',
  	"identity_established" numeric DEFAULT 1969,
  	"identity_management" varchar DEFAULT 'Sisters of Charity of Jesus and Mary',
  	"identity_principal" varchar DEFAULT 'Sr. Gracy M.D',
  	"identity_logo_id" integer,
  	"contact_address_street" varchar DEFAULT 'P.O. Sidhpur',
  	"contact_address_tehsil" varchar DEFAULT 'Dharamshala',
  	"contact_address_district" varchar DEFAULT 'Kangra',
  	"contact_address_state" varchar DEFAULT 'Himachal Pradesh',
  	"contact_address_pincode" varchar DEFAULT '176057',
  	"contact_map_plus_code" varchar DEFAULT '59R3+G4 Sidhpur, Himachal Pradesh',
  	"online_services_fee_portal" varchar DEFAULT 'https://shsd.iqdigit.com/',
  	"online_services_registration_portal" varchar DEFAULT 'https://shsd.iqdigit.com/2025_stud_reg_form/auth.php',
  	"online_services_alumni_registration" varchar DEFAULT 'https://shsd.iqdigit.com/2025_alumni_reg_form/alumni_reg_form.php',
  	"online_services_android_app" varchar DEFAULT 'https://play.google.com/store/apps/details?id=com.school.iqdigit_flutter',
  	"online_services_ios_app" varchar DEFAULT 'https://apps.apple.com/in/app/iqdigit/id1617528225',
  	"header_apply_label" varchar DEFAULT 'Apply now',
  	"header_apply_href" varchar DEFAULT '/admission',
  	"header_mobile_apply_label" varchar DEFAULT 'Apply for admission',
  	"footer_description" varchar DEFAULT 'Nurturing Hearts, Shaping Futures. CISCE, New Delhi affiliated school run by Sisters of Charity of Jesus and Mary.',
  	"announcement_enabled" boolean DEFAULT false,
  	"announcement_message" varchar,
  	"announcement_link_label" varchar,
  	"announcement_link_href" varchar,
  	"announcement_tone" "enum_site_settings_announcement_tone" DEFAULT 'info',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_site_settings_v_version_contact_phones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v_version_contact_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v_version_navigation_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"external" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v_version_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"external" boolean,
  	"summary" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v_version_footer_quick_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v_version_footer_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"platform" "enum__site_settings_v_version_footer_social_platform" NOT NULL,
  	"url" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_identity_name" varchar DEFAULT 'Sacred Heart Sr. Sec. School' NOT NULL,
  	"version_identity_full_name" varchar DEFAULT 'Sacred Heart Senior Secondary School' NOT NULL,
  	"version_identity_tagline" varchar DEFAULT 'Nurturing Hearts, Shaping Futures',
  	"version_identity_affiliation" varchar DEFAULT 'CISCE, New Delhi',
  	"version_identity_established" numeric DEFAULT 1969,
  	"version_identity_management" varchar DEFAULT 'Sisters of Charity of Jesus and Mary',
  	"version_identity_principal" varchar DEFAULT 'Sr. Gracy M.D',
  	"version_identity_logo_id" integer,
  	"version_contact_address_street" varchar DEFAULT 'P.O. Sidhpur',
  	"version_contact_address_tehsil" varchar DEFAULT 'Dharamshala',
  	"version_contact_address_district" varchar DEFAULT 'Kangra',
  	"version_contact_address_state" varchar DEFAULT 'Himachal Pradesh',
  	"version_contact_address_pincode" varchar DEFAULT '176057',
  	"version_contact_map_plus_code" varchar DEFAULT '59R3+G4 Sidhpur, Himachal Pradesh',
  	"version_online_services_fee_portal" varchar DEFAULT 'https://shsd.iqdigit.com/',
  	"version_online_services_registration_portal" varchar DEFAULT 'https://shsd.iqdigit.com/2025_stud_reg_form/auth.php',
  	"version_online_services_alumni_registration" varchar DEFAULT 'https://shsd.iqdigit.com/2025_alumni_reg_form/alumni_reg_form.php',
  	"version_online_services_android_app" varchar DEFAULT 'https://play.google.com/store/apps/details?id=com.school.iqdigit_flutter',
  	"version_online_services_ios_app" varchar DEFAULT 'https://apps.apple.com/in/app/iqdigit/id1617528225',
  	"version_header_apply_label" varchar DEFAULT 'Apply now',
  	"version_header_apply_href" varchar DEFAULT '/admission',
  	"version_header_mobile_apply_label" varchar DEFAULT 'Apply for admission',
  	"version_footer_description" varchar DEFAULT 'Nurturing Hearts, Shaping Futures. CISCE, New Delhi affiliated school run by Sisters of Charity of Jesus and Mary.',
  	"version_announcement_enabled" boolean DEFAULT false,
  	"version_announcement_message" varchar,
  	"version_announcement_link_label" varchar,
  	"version_announcement_link_href" varchar,
  	"version_announcement_tone" "enum__site_settings_v_version_announcement_tone" DEFAULT 'info',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_updated_by_id_users_id_fk" FOREIGN KEY ("version_updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_contact_phones" ADD CONSTRAINT "site_settings_contact_phones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_contact_emails" ADD CONSTRAINT "site_settings_contact_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_navigation_children" ADD CONSTRAINT "site_settings_navigation_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_navigation" ADD CONSTRAINT "site_settings_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_quick_links" ADD CONSTRAINT "site_settings_footer_quick_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_social" ADD CONSTRAINT "site_settings_footer_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_identity_logo_id_media_id_fk" FOREIGN KEY ("identity_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_contact_phones" ADD CONSTRAINT "_site_settings_v_version_contact_phones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_contact_emails" ADD CONSTRAINT "_site_settings_v_version_contact_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_navigation_children" ADD CONSTRAINT "_site_settings_v_version_navigation_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v_version_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_navigation" ADD CONSTRAINT "_site_settings_v_version_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_footer_quick_links" ADD CONSTRAINT "_site_settings_v_version_footer_quick_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_footer_social" ADD CONSTRAINT "_site_settings_v_version_footer_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_identity_logo_id_media_id_fk" FOREIGN KEY ("version_identity_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "pages_path_idx" ON "pages" USING btree ("path");
  CREATE INDEX "pages_seo_seo_image_idx" ON "pages" USING btree ("seo_image_id");
  CREATE INDEX "pages_updated_by_idx" ON "pages" USING btree ("updated_by_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_path_idx" ON "_pages_v" USING btree ("version_path");
  CREATE INDEX "_pages_v_version_seo_version_seo_image_idx" ON "_pages_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_pages_v_version_version_updated_by_idx" ON "_pages_v" USING btree ("version_updated_by_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "media_folder_idx" ON "media" USING btree ("folder");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_contact_phones_order_idx" ON "site_settings_contact_phones" USING btree ("_order");
  CREATE INDEX "site_settings_contact_phones_parent_id_idx" ON "site_settings_contact_phones" USING btree ("_parent_id");
  CREATE INDEX "site_settings_contact_emails_order_idx" ON "site_settings_contact_emails" USING btree ("_order");
  CREATE INDEX "site_settings_contact_emails_parent_id_idx" ON "site_settings_contact_emails" USING btree ("_parent_id");
  CREATE INDEX "site_settings_navigation_children_order_idx" ON "site_settings_navigation_children" USING btree ("_order");
  CREATE INDEX "site_settings_navigation_children_parent_id_idx" ON "site_settings_navigation_children" USING btree ("_parent_id");
  CREATE INDEX "site_settings_navigation_order_idx" ON "site_settings_navigation" USING btree ("_order");
  CREATE INDEX "site_settings_navigation_parent_id_idx" ON "site_settings_navigation" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_quick_links_order_idx" ON "site_settings_footer_quick_links" USING btree ("_order");
  CREATE INDEX "site_settings_footer_quick_links_parent_id_idx" ON "site_settings_footer_quick_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_social_order_idx" ON "site_settings_footer_social" USING btree ("_order");
  CREATE INDEX "site_settings_footer_social_parent_id_idx" ON "site_settings_footer_social" USING btree ("_parent_id");
  CREATE INDEX "site_settings_identity_identity_logo_idx" ON "site_settings" USING btree ("identity_logo_id");
  CREATE INDEX "_site_settings_v_version_contact_phones_order_idx" ON "_site_settings_v_version_contact_phones" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_contact_phones_parent_id_idx" ON "_site_settings_v_version_contact_phones" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_contact_emails_order_idx" ON "_site_settings_v_version_contact_emails" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_contact_emails_parent_id_idx" ON "_site_settings_v_version_contact_emails" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_navigation_children_order_idx" ON "_site_settings_v_version_navigation_children" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_navigation_children_parent_id_idx" ON "_site_settings_v_version_navigation_children" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_navigation_order_idx" ON "_site_settings_v_version_navigation" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_navigation_parent_id_idx" ON "_site_settings_v_version_navigation" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_footer_quick_links_order_idx" ON "_site_settings_v_version_footer_quick_links" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_footer_quick_links_parent_id_idx" ON "_site_settings_v_version_footer_quick_links" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_footer_social_order_idx" ON "_site_settings_v_version_footer_social" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_footer_social_parent_id_idx" ON "_site_settings_v_version_footer_social" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_identity_version_identity_logo_idx" ON "_site_settings_v" USING btree ("version_identity_logo_id");
  CREATE INDEX "_site_settings_v_created_at_idx" ON "_site_settings_v" USING btree ("created_at");
  CREATE INDEX "_site_settings_v_updated_at_idx" ON "_site_settings_v" USING btree ("updated_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_contact_phones" CASCADE;
  DROP TABLE "site_settings_contact_emails" CASCADE;
  DROP TABLE "site_settings_navigation_children" CASCADE;
  DROP TABLE "site_settings_navigation" CASCADE;
  DROP TABLE "site_settings_footer_quick_links" CASCADE;
  DROP TABLE "site_settings_footer_social" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "_site_settings_v_version_contact_phones" CASCADE;
  DROP TABLE "_site_settings_v_version_contact_emails" CASCADE;
  DROP TABLE "_site_settings_v_version_navigation_children" CASCADE;
  DROP TABLE "_site_settings_v_version_navigation" CASCADE;
  DROP TABLE "_site_settings_v_version_footer_quick_links" CASCADE;
  DROP TABLE "_site_settings_v_version_footer_social" CASCADE;
  DROP TABLE "_site_settings_v" CASCADE;
  DROP TYPE "public"."enum_pages_kind";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_kind";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_site_settings_footer_social_platform";
  DROP TYPE "public"."enum_site_settings_announcement_tone";
  DROP TYPE "public"."enum__site_settings_v_version_footer_social_platform";
  DROP TYPE "public"."enum__site_settings_v_version_announcement_tone";`)
}
