import { Database } from './database.types';

export type CategoryType =
  | Database['public']['Tables']['app_categories']['Insert']
  | Database['public']['Tables']['app_categories']['Update'];
