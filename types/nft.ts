import { Database } from './database.types';

export type NFTCollectionInfo = {
  collectionName: string;
  createdBy: string;
  verified: boolean;
  items: string;
  owners: string;
  floorPrice: string;
  volumeTraded: string;
  totalItems: number;
  coverUrl: string;
  avatarUrl: string;
  description: string;
};

// export type NFTInfo = {
//   id: string;
//   collectionName: string;
//   favorites: number;
//   topBid: string;
//   last: string;
//   expirationDate: string;
//   imageUrl: string;
// };

export type Price = {
  amount: string;
  token: string;
  usd: number;
};

export type ProductType =
  | Database['public']['Tables']['app_products']['Insert']
  | Database['public']['Tables']['app_products']['Update'];

export type GalleryCardInfo = {
  description?: string;
  id: string;
  imageUrl?: string;
  title?: string;
  url: string;
  videoUrl?: string;
  width?: number;
  height?: number;
};
