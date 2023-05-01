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

export type ProductType = {
  id?: string | null;
  live?: boolean;
  isDeleted?: boolean;
  number?: number;
  title?: string;
  owner?: string;
  seller?: string;
  url?: string;
  images?: string[];
  description?: string;
  contractAddress?: string;
  collectionName?: string;
  collectionUrl?: string;
  imageUrl?: string;
  videoUrl?: string;
  verified?: boolean;
  endDate?: string;
  startDate?: string;
  available?: boolean;
  isAuction?: boolean;
  isOnSale?: boolean;
  lastPrice?: Price;
  topBidPrice?: Price;
  price?: Price;
  auctionPrice?: Price;
  offerPrice?: Price;
  views?: number;
  likes?: number;
  alt?: string;
};

// export type CardInfo = {
//   id: string;
//   number: number;
//   title: string;
//   owner: string;
//   seller?: string;
//   url: string;
//   images?: string[];
//   description?: string;
//   contractAddress?: string;
//   collectionName?: string;
//   collectionUrl?: string;
//   imageUrl?: string;
//   videoUrl?: string;
//   verified?: boolean;
//   startDate?: string;
//   endDate?: string;
//   available?: boolean;
//   isAuction?: boolean;
//   isOnSale?: boolean;
//   lastPrice?: Price;
//   topBidPrice?: Price;
//   price?: Price;
//   auctionPrice?: Price;
//   offerPrice?: Price;
//   views: number;
//   likes: number;
// };

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
