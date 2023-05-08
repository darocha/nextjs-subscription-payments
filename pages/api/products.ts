import { supabase } from '@/utils/supabase-client';
import { getUser } from './user';
import { Database } from '@/types/database.types';
import { ProductType } from '@/types/nft';

const add = async (product: ProductType) => {
  try {
    const productEntity: Database['public']['Tables']['app_products']['Update'] =
      product;
    const user = await getUser();

    const response = await supabase
      .from('app_products')
      .insert({ ...productEntity, userId: user?.id });
    return response.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

const update = async (id: string, product: ProductType) => {
  try {
    const productEntity: Database['public']['Tables']['app_products']['Update'] =
      product;
    const user = await getUser();
    const response = await supabase
      .from('app_products')
      .update({
        ...productEntity
      })
      .eq('user_id', user?.id)
      .eq('id', id);

    return response;
  } catch (error: any) {
    console.log(error.message);
  }
};

const remove = async (id: string) => {
  try {
    const user = await getUser();
    const response = await supabase
      .from('app_products')
      .delete()
      .eq('id', id)
      .eq('user_id', user?.id);
    return response;
  } catch (error: any) {
    console.log(error.message);
  }
};

const get = async (id: string) => {
  try {
    const user = await getUser();
    const response = await supabase
      .from('app_products')
      .select()
      .eq('id', id)
      .eq('user_id', user?.id);
    return response.data as ProductType;
  } catch (error: any) {
    console.log(error.message);
  }
};

const getAll = async (userId: string) => {
  try {
    const response = await supabase
      .from('app_products')
      .select('*')
      .eq('user_id', userId);
    return response.data as ProductType[];
  } catch (error: any) {
    console.log(error.message);
  }
};

const search = async (keyword: string, userId: string, appId: string) => {
  try {
    const { data, error } = await supabase
      .from('app_products')
      .select()
      .eq('user_id', userId)
      .eq('app_id', appId)
      .textSearch('title', `'${keyword}'`);
    // if (error){
    //   throw new Error(error.message);
    // }
    return data as ProductType[];
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

const getMockProduct = async (productId: string, userId: string) => {
  const products = await getMockProducts(userId);
  return products[0];
};

export const productApi = {
  add,
  delete: remove,
  get,
  getAll,
  update,
  search,
  getMockProduct,
  getMockProducts
};
