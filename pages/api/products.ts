import snakecaseKeys from 'snakecase-keys';
import camelcaseKeys from 'camelcase-keys';
import { supabase } from '@/utils/supabase-client';
import { getUser } from './user';
import { Database } from '@/types/types_db';
import { ProductType } from '@/types/nft';

const convertToCamelcase = (values: any) =>
  camelcaseKeys(values, { deep: true });
const convertToSnakecase = (values: any) =>
  snakecaseKeys(values, { deep: true });

const addProduct = async (product: ProductType) => {
  try {
    const productEntity: Database['public']['Tables']['products']['Insert'] =
      convertToSnakecase(product);
    const user = await getUser();
    const response = await supabase
      .from('products')
      .insert({ ...productEntity, user_id: user?.id });
    return convertToCamelcase(response.data);
  } catch (error: any) {
    console.log(error.message);
  }
};

const updateProduct = async (id: string, product: ProductType) => {
  try {
    const productEntity: Database['public']['Tables']['products']['Update'] =
      convertToSnakecase(product);
    const user = await getUser();
    const response = await supabase
      .from('products')
      .update({
        ...productEntity
      })
      .eq('user_id', user?.id)
      .eq('id', id);

    return convertToCamelcase(response);
  } catch (error: any) {
    console.log(error.message);
  }
};

const deleteProduct = async (id: string) => {
  try {
    const user = await getUser();
    const response = await supabase
      .from('product')
      .delete()
      .eq('id', id)
      .eq('user_id', user?.id);
    return convertToCamelcase(response);
  } catch (error: any) {
    console.log(error.message);
  }
};

const getProductById = async (id: string) => {
  try {
    const user = await getUser();
    const response = await supabase
      .from('product')
      .select()
      .eq('id', id)
      .eq('user_id', user?.id);
    return convertToCamelcase(response.data) as ProductType;
  } catch (error: any) {
    console.log(error.message);
  }
};

const getProducts = async (userId: string) => {
  try {
    const response = await supabase
      .from('products')
      .select('*')
      .eq('user_id', userId);
    return convertToCamelcase(response.data) as ProductType[];
  } catch (error: any) {
    console.log(error.message);
  }
};

const getMockProducts = async (userId: string) => {
  const products = [];
  const ProductModel = ({ id = '', i = 0 }) => {
    return {
      live: true,
      isDeleted: false,
      id: `CryptoPunk#${id}`,
      number: i,
      title: 'CryptoPunk',
      owner: 'Owner1',
      seller: 'Seller1',
      url: `/nft/CryptoPunk#${id}`,
      imageUrl: '/images/nfts/1.png',
      images: [
        '/images/nfts/1.png',
        '/images/nfts/2.png',
        '/images/nfts/3.png'
      ],
      description: '',
      contractAddress: '0xabcdededededefedfeadeda343',
      collectionName: 'CryptoPunks',
      collectionUrl: `/nft/CryptoPunk#${id}`,
      videoUrl: '',
      verified: true,
      endDate: '',
      startDate: '',
      available: true,
      isAuction: true,
      isOnSale: true,
      lastPrice: {
        usd: 120.0,
        amount: '0',
        token: 'ETH'
      },
      topBidPrice: {
        usd: 100,
        amount: '0',
        token: 'ETH'
      },
      price: {
        usd: 80,
        amount: '0.04',
        token: 'ETH'
      },
      offerPrice: {
        usd: 50,
        amount: '0',
        token: 'ETH'
      },
      views: 1259,
      likes: 259
    } as ProductType;
  };
  for (let i = 0; i < 12; i++) {
    const p = ProductModel({ id: i.toString(), i });
    products.push(p);
  }

  return products;
};

export const productApi = {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
  getMockProducts
};
