create table "public"."app_ads" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone,        
    "updated_at" timestamp with time zone,        
    "start_date" timestamp with time zone,        
    "end_date" timestamp with time zone,
    "clicks_purchased" integer default 0,
    "clicks_remaining" integer default 0,
    "active" boolean default false,
    "image_url" text,
    "video_url" text,
    "views" integer default 0,
    "cost_per_click" numeric default '0'::numeric,
    "keywords" text,
    "category_id" text,
    "category_name" text,
    "url" text,
    "flagged" boolean default false,
    "status" text default 'review'::text,
    "flagged_count" text,
    "body" text
);


alter table "public"."app_ads" enable row level security;

create table "public"."app_categories" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone default (now() AT TIME ZONE 'utc'::text),
    "update_at" timestamp with time zone default (now() AT TIME ZONE 'utc'::text),
    "parent_id" text,
    "url" text,
    "name" text,
    "icon_url" text,
    "level" integer default 0,
    "app_id" text,
    "user_id" text,
    "taxonomy" text,
    "language" text default 'english'::text,
    "display_on_sidebar" boolean default true,
    "display_on_topbar" boolean default false,
    "locked" boolean default false,
    "order_index" integer default 0,
    "css_style" text,
    "css_class" text,
    "collapsed" boolean default false,
    "country" text default 'US'::text,
    "enabled" boolean default false
);


alter table "public"."app_categories" enable row level security;

CREATE UNIQUE INDEX app_ads_pkey ON public.app_ads USING btree (id);

CREATE UNIQUE INDEX app_categories_pkey ON public.app_categories USING btree (id);

alter table "public"."app_ads" add constraint "app_ads_pkey" PRIMARY KEY using index "app_ads_pkey";

alter table "public"."app_categories" add constraint "app_categories_pkey" PRIMARY KEY using index "app_categories_pkey";