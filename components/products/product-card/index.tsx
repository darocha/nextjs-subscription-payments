import Image from 'next/image';
import { EthereumIcon, HeartIcon } from '@/icons/index';
import { IconButton } from '@/components/common/buttons';
import Link from 'next/link';
import { ProductType } from '@/types/nft';

import { FC } from 'react';

export type ProductCardProps = {
  product: ProductType;
  onBuyClick?: Function;
};

export const ProductCard: FC<ProductCardProps> = ({ product, onBuyClick }) => {
  const defaultMarketplaceImageUrl = '/images/nfts/1.png';

  const {
    id,
    imageUrl,
    seller,
    owner,
    title = '',
    views = 0,
    alt = '',
    isOnSale = false,
    isAuction = false,
    available = false,
    price = undefined,
    lastPrice = undefined,
    offerPrice = undefined,
    auctionPrice = undefined,
    url = '/'
  } = product;

  return (
    <div className="card relative group hover:shadow-lg bg-white rounded-lg overflow-hidden">
      <div className="py-0 px-3 flex justify-between items-center">
        <span className="w-full inline-flex text-sm">{title}</span>
        <span className="inline-flex items-center justify-items-end text-gray-500 font-medium text-sm">
          <IconButton className="-mr-1">{/* <HeartIcon /> */}</IconButton>
          {views > 0 ? views : ''}
        </span>
      </div>
      <Link href={url}>
        <Image
          src={imageUrl || defaultMarketplaceImageUrl}
          height={800}
          width={800}
          alt={alt}
          // fill={false}
          // layout="responsive"
          // objectFit="cover"
        />
      </Link>
      <div className="p-3 pt-2">
        <span className="font-semibold text-sm">{title}</span>
        {seller && seller !== '0x0000000000000000000000000000000000000000' && (
          <span className="block text-gray-600 text-xs">{seller}</span>
        )}
        {owner && owner !== '0x0000000000000000000000000000000000000000' && (
          <span className="block text-gray-600 text-xs">{owner}</span>
        )}
        <span className="block text-gray-600 text-xs">{id}</span>

        <div className="flex pt-2 items-center justify-end">
          {/* <IconButton className="-mr-2">
            <EthereumIcon />
          </IconButton> */}

          {price && (
            <div className="text-gray-500 font-medium text-sm">
              {price?.amount} {price?.token}
            </div>
          )}
        </div>

        {onBuyClick && (
          <button
            onClick={() => onBuyClick(product)}
            className="p-2 mt-1 w-full text-sm font-semibold border rounded-sm bg-white text-gray-400 hover:border-opacity-0 hover:text-white hover:bg-blue-800"
          >
            Buy Now
          </button>
        )}
      </div>
    </div>
  );
};
