export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          city: string | null
          company_name: string | null
          country: string | null
          county: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: number
          is_billing: boolean | null
          is_default: boolean | null
          last_name: string | null
          line1: string | null
          line2: string | null
          middle_name: string | null
          notes: string | null
          state: string | null
          type: string | null
          updated_at: string | null
          user_id: string | null
          zip_code: string | null
        }
        Insert: {
          city?: string | null
          company_name?: string | null
          country?: string | null
          county?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: never
          is_billing?: boolean | null
          is_default?: boolean | null
          last_name?: string | null
          line1?: string | null
          line2?: string | null
          middle_name?: string | null
          notes?: string | null
          state?: string | null
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
          zip_code?: string | null
        }
        Update: {
          city?: string | null
          company_name?: string | null
          country?: string | null
          county?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: never
          is_billing?: boolean | null
          is_default?: boolean | null
          last_name?: string | null
          line1?: string | null
          line2?: string | null
          middle_name?: string | null
          notes?: string | null
          state?: string | null
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
          zip_code?: string | null
        }
      }
      app_ads: {
        Row: {
          active: boolean | null
          body: string | null
          category_id: string | null
          category_name: string | null
          clicks_purchased: number | null
          clicks_remaining: number | null
          cost_per_click: number | null
          created_at: string | null
          end_date: string | null
          flagged: boolean | null
          flagged_count: string | null
          id: string
          image_url: string | null
          keywords: string | null
          start_date: string | null
          status: string | null
          updated_at: string | null
          url: string | null
          video_url: string | null
          views: number | null
        }
        Insert: {
          active?: boolean | null
          body?: string | null
          category_id?: string | null
          category_name?: string | null
          clicks_purchased?: number | null
          clicks_remaining?: number | null
          cost_per_click?: number | null
          created_at?: string | null
          end_date?: string | null
          flagged?: boolean | null
          flagged_count?: string | null
          id?: string
          image_url?: string | null
          keywords?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          url?: string | null
          video_url?: string | null
          views?: number | null
        }
        Update: {
          active?: boolean | null
          body?: string | null
          category_id?: string | null
          category_name?: string | null
          clicks_purchased?: number | null
          clicks_remaining?: number | null
          cost_per_click?: number | null
          created_at?: string | null
          end_date?: string | null
          flagged?: boolean | null
          flagged_count?: string | null
          id?: string
          image_url?: string | null
          keywords?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          url?: string | null
          video_url?: string | null
          views?: number | null
        }
      }
      app_categories: {
        Row: {
          app_id: string | null
          collapsed: boolean | null
          country: string | null
          created_at: string | null
          css_class: string | null
          css_style: string | null
          display_on_sidebar: boolean | null
          display_on_topbar: boolean | null
          enabled: boolean | null
          icon_url: string | null
          id: string
          language: string | null
          level: number | null
          locked: boolean | null
          name: string | null
          order_index: number | null
          parent_id: string | null
          taxonomy: string | null
          update_at: string | null
          url: string | null
          user_id: string | null
        }
        Insert: {
          app_id?: string | null
          collapsed?: boolean | null
          country?: string | null
          created_at?: string | null
          css_class?: string | null
          css_style?: string | null
          display_on_sidebar?: boolean | null
          display_on_topbar?: boolean | null
          enabled?: boolean | null
          icon_url?: string | null
          id?: string
          language?: string | null
          level?: number | null
          locked?: boolean | null
          name?: string | null
          order_index?: number | null
          parent_id?: string | null
          taxonomy?: string | null
          update_at?: string | null
          url?: string | null
          user_id?: string | null
        }
        Update: {
          app_id?: string | null
          collapsed?: boolean | null
          country?: string | null
          created_at?: string | null
          css_class?: string | null
          css_style?: string | null
          display_on_sidebar?: boolean | null
          display_on_topbar?: boolean | null
          enabled?: boolean | null
          icon_url?: string | null
          id?: string
          language?: string | null
          level?: number | null
          locked?: boolean | null
          name?: string | null
          order_index?: number | null
          parent_id?: string | null
          taxonomy?: string | null
          update_at?: string | null
          url?: string | null
          user_id?: string | null
        }
      }
      app_products: {
        Row: {
          appId: string | null
          auctionPriceAmount: number | null
          auctionPriceToken: string | null
          auctionPriceUSD: number | null
          available: boolean | null
          collectionName: string | null
          collectionUrl: string | null
          contractAddress: string | null
          createdAt: string | null
          description: string | null
          endDate: string | null
          flagged: number | null
          id: string
          images: Json | null
          imageUrl: string | null
          isAuction: boolean | null
          isDeleted: boolean | null
          isOnSale: boolean | null
          isSuspended: boolean | null
          lastPriceAmount: string | null
          lastPriceToken: string | null
          lastPriceUSD: number | null
          lightningDeal: boolean | null
          likes: number | null
          live: boolean | null
          metaDescription: string | null
          metaKeywords: string | null
          metaTitle: string | null
          notes: string | null
          number: number | null
          offerPriceAmount: string | null
          offerPriceToken: string | null
          offerPriceUSD: number | null
          owner: string | null
          priceAmount: string | null
          priceToken: string | null
          priceUSD: number | null
          salePriceAmount: string | null
          salePriceToken: string | null
          salePriceUSD: number | null
          searchTerms: string | null
          seller: string | null
          sold: number | null
          sponsored: boolean | null
          startDate: string | null
          tags: string | null
          title: string | null
          topBidPriceAmount: string | null
          topBidPriceToken: string | null
          topBidPriceUSD: number | null
          updateAt: string | null
          url: string | null
          userId: string | null
          verified: boolean | null
          videoUrl: string | null
          views: number | null
        }
        Insert: {
          appId?: string | null
          auctionPriceAmount?: number | null
          auctionPriceToken?: string | null
          auctionPriceUSD?: number | null
          available?: boolean | null
          collectionName?: string | null
          collectionUrl?: string | null
          contractAddress?: string | null
          createdAt?: string | null
          description?: string | null
          endDate?: string | null
          flagged?: number | null
          id?: string
          images?: Json | null
          imageUrl?: string | null
          isAuction?: boolean | null
          isDeleted?: boolean | null
          isOnSale?: boolean | null
          isSuspended?: boolean | null
          lastPriceAmount?: string | null
          lastPriceToken?: string | null
          lastPriceUSD?: number | null
          lightningDeal?: boolean | null
          likes?: number | null
          live?: boolean | null
          metaDescription?: string | null
          metaKeywords?: string | null
          metaTitle?: string | null
          notes?: string | null
          number?: number | null
          offerPriceAmount?: string | null
          offerPriceToken?: string | null
          offerPriceUSD?: number | null
          owner?: string | null
          priceAmount?: string | null
          priceToken?: string | null
          priceUSD?: number | null
          salePriceAmount?: string | null
          salePriceToken?: string | null
          salePriceUSD?: number | null
          searchTerms?: string | null
          seller?: string | null
          sold?: number | null
          sponsored?: boolean | null
          startDate?: string | null
          tags?: string | null
          title?: string | null
          topBidPriceAmount?: string | null
          topBidPriceToken?: string | null
          topBidPriceUSD?: number | null
          updateAt?: string | null
          url?: string | null
          userId?: string | null
          verified?: boolean | null
          videoUrl?: string | null
          views?: number | null
        }
        Update: {
          appId?: string | null
          auctionPriceAmount?: number | null
          auctionPriceToken?: string | null
          auctionPriceUSD?: number | null
          available?: boolean | null
          collectionName?: string | null
          collectionUrl?: string | null
          contractAddress?: string | null
          createdAt?: string | null
          description?: string | null
          endDate?: string | null
          flagged?: number | null
          id?: string
          images?: Json | null
          imageUrl?: string | null
          isAuction?: boolean | null
          isDeleted?: boolean | null
          isOnSale?: boolean | null
          isSuspended?: boolean | null
          lastPriceAmount?: string | null
          lastPriceToken?: string | null
          lastPriceUSD?: number | null
          lightningDeal?: boolean | null
          likes?: number | null
          live?: boolean | null
          metaDescription?: string | null
          metaKeywords?: string | null
          metaTitle?: string | null
          notes?: string | null
          number?: number | null
          offerPriceAmount?: string | null
          offerPriceToken?: string | null
          offerPriceUSD?: number | null
          owner?: string | null
          priceAmount?: string | null
          priceToken?: string | null
          priceUSD?: number | null
          salePriceAmount?: string | null
          salePriceToken?: string | null
          salePriceUSD?: number | null
          searchTerms?: string | null
          seller?: string | null
          sold?: number | null
          sponsored?: boolean | null
          startDate?: string | null
          tags?: string | null
          title?: string | null
          topBidPriceAmount?: string | null
          topBidPriceToken?: string | null
          topBidPriceUSD?: number | null
          updateAt?: string | null
          url?: string | null
          userId?: string | null
          verified?: boolean | null
          videoUrl?: string | null
          views?: number | null
        }
      }
      customers: {
        Row: {
          id: string
          stripe_customer_id: string | null
        }
        Insert: {
          id: string
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          stripe_customer_id?: string | null
        }
      }
      prices: {
        Row: {
          active: boolean | null
          currency: string | null
          description: string | null
          id: string
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count: number | null
          metadata: Json | null
          product_id: string | null
          trial_period_days: number | null
          type: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount: number | null
        }
        Insert: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Update: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
      }
      products: {
        Row: {
          active: boolean | null
          description: string | null
          id: string
          image: string | null
          metadata: Json | null
          name: string | null
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
      subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created: string
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          price_id: string | null
          quantity: number | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          trial_end: string | null
          trial_start: string | null
          user_id: string
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id: string
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id?: string
        }
      }
      users: {
        Row: {
          avatar_url: string | null
          billing_address: Json | null
          full_name: string | null
          id: string
          payment_method: Json | null
        }
        Insert: {
          avatar_url?: string | null
          billing_address?: Json | null
          full_name?: string | null
          id: string
          payment_method?: Json | null
        }
        Update: {
          avatar_url?: string | null
          billing_address?: Json | null
          full_name?: string | null
          id?: string
          payment_method?: Json | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          created_at: string | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

