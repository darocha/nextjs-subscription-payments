create table "public"."app_products" (
    "id" uuid not null default uuid_generate_v4(),
    "appId" text,
    "auctionPriceAmount" integer,
    "auctionPriceToken" text,
    "auctionPriceUSD" integer,
    "available" boolean,
    "collectionName" text,
    "collectionUrl" text,
    "contractAddress" text,
    "createdAt" timestamp with time zone,
    "description" text,
    "endDate" timestamp with time zone,
    "flagged" integer default 0,
    "imageUrl" text,
    "images" json,
    "isAuction" boolean,
    "isDeleted" boolean,
    "isOnSale" boolean,
    "isSuspended" boolean default false,
    "lastPriceAmount" text,
    "lastPriceToken" text,
    "lastPriceUSD" integer,
    "lightningDeal" boolean default false,
    "likes" integer,
    "live" boolean,
    "metaDescription" text,
    "metaKeywords" text,
    "metaTitle" text,
    "notes" text,
    "number" integer,
    "offerPriceAmount" text,
    "offerPriceToken" text,
    "offerPriceUSD" integer,
    "owner" text,
    "priceAmount" text,
    "priceToken" text,
    "priceUSD" integer,
    "salePriceAmount" text,
    "salePriceToken" text,
    "salePriceUSD" integer,
    "searchTerms" text,
    "seller" text,
    "sold" integer,
    "sponsored" boolean,
    "startDate" timestamp with time zone,
    "tags" text,
    "title" text,
    "topBidPriceAmount" text,
    "topBidPriceToken" text,
    "topBidPriceUSD" integer,
    "updateAt" timestamp with time zone default (now() AT TIME ZONE 'utc'::text),
    "url" text,
    "userId" uuid,
    "verified" boolean,
    "videoUrl" text,
    "views" integer
);


alter table "public"."app_products" enable row level security;

CREATE UNIQUE INDEX app_products_pkey ON public.app_products USING btree (id);

alter table "public"."app_products" add constraint "app_products_pkey" PRIMARY KEY using index "app_products_pkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$function$
;
