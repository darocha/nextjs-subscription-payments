import { Database } from './database.types';

export type AdsType =
  | Database['public']['Tables']['app_ads']['Insert']
  | Database['public']['Tables']['app_ads']['Update'];
