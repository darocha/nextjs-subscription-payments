import { supabase } from '@/utils/supabase-client';
import { getUser } from './user';
import { AdsType } from '@/types/ads';

const add = async (ad: AdsType) => {
  try {
    const user = await getUser();
    const response = await supabase
      .from('app_ads')
      .insert({ ...ad, user_id: user?.id });
    return response.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

const update = async (id: string, ad: AdsType) => {
  try {
    const user = await getUser();
    const response = await supabase
      .from('app_ads')
      .update({
        ...ad
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
      .from('app_ads')
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
      .from('app_ads')
      .select()
      .eq('id', id)
      .eq('user_id', user?.id);
    return response.data as AdsType;
  } catch (error: any) {
    console.log(error.message);
  }
};

const getAll = async (userId: string) => {
  try {
    const response = await supabase
      .from('app_ads')
      .select('*')
      .eq('user_id', userId);
    return response.data as AdsType[];
  } catch (error: any) {
    console.log(error.message);
  }
};

export const adApi = {
  add,
  update,
  delete: remove,
  get,
  getAll
};
