import { supabase } from '@/utils/supabase-client';
import { getUser } from './user';
import { CategoryType } from '@/types/category';

const add = async (category: CategoryType) => {
  try {
    const user = await getUser();
    const response = await supabase
      .from('app_categories')
      .insert({ ...category, user_id: user?.id });
    return response.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

const update = async (id: string, category: CategoryType) => {
  try {
    const user = await getUser();
    const response = await supabase
      .from('app_categories')
      .update({
        ...category
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
      .from('app_categories')
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
      .from('app_categories')
      .select()
      .eq('id', id)
      .eq('user_id', user?.id);
    return response.data as CategoryType;
  } catch (error: any) {
    console.log(error.message);
  }
};

const getAll = async () => {
  const user = await getUser();
  try {
    const response = await supabase.from('app_categories').select('*');
    return response.data as CategoryType[];
  } catch (error: any) {
    console.log(error.message);
  }
};

export const categoryApi = {
  add,
  update,
  delete: remove,
  get,
  getAll
};
