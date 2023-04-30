import snakecaseKeys from 'snakecase-keys';
import camelcaseKeys from 'camelcase-keys';
import { supabase } from '@/utils/supabase-client';
import { getUser } from './user';
import { AddressType } from '@/types';
import { Database } from '@/types/types_db';

const convertToCamelcase = (values: any) =>
  camelcaseKeys(values, { deep: true });
const convertToSnakecase = (values: any) =>
  snakecaseKeys(values, { deep: true });

const handleDefaultAddressChanged = async (address: AddressType) => {
  try {
    const user = await getUser();
    if (address.isDefault && user) {
      let defaultAddresses;
      if (address.isBilling) {
        defaultAddresses = await getDefaultBillingAddresses(user.id);
      } else {
        defaultAddresses = await getDefaultShippingAddresses(user.id);
      }
      if (defaultAddresses && defaultAddresses.length) {
        defaultAddresses.forEach((defaultAddress) => {
          if (defaultAddress.id) {
            updateAddress(defaultAddress.id, { isDefault: false });
          }
        });
      }
    }
  } catch (error: any) {
    console.log(error.message);
  }
};

const addAddress = async (address: AddressType) => {
  try {
    await handleDefaultAddressChanged(address);
    const addressEntity: Database['public']['Tables']['addresses']['Insert'] =
      convertToSnakecase(address);
    const user = await getUser();
    const response = await supabase
      .from('addresses')
      .insert({ ...addressEntity, user_id: user?.id });
    return convertToCamelcase(response.data);
  } catch (error: any) {
    console.log(error.message);
  }
};

const updateAddress = async (id: number, address: AddressType) => {
  try {
    await handleDefaultAddressChanged(address);
    const addressEntity: Database['public']['Tables']['addresses']['Update'] =
      convertToSnakecase(address);
    const user = await getUser();
    const response = await supabase
      .from('addresses')
      .update({
        ...addressEntity
      })
      .eq('user_id', user?.id)
      .eq('id', id);

    return convertToCamelcase(response);
  } catch (error: any) {
    console.log(error.message);
  }
};

const deleteAddress = async (id: number) => {
  try {
    const user = await getUser();
    const response = await supabase
      .from('addresses')
      .delete()
      .eq('id', id)
      .eq('user_id', user?.id);
    return convertToCamelcase(response);
  } catch (error: any) {
    console.log(error.message);
  }
};

const getAddressById = async (id: string) => {
  try {
    const user = await getUser();
    const response = await supabase
      .from('addresses')
      .select()
      .eq('id', id)
      .eq('user_id', user?.id);
    return convertToCamelcase(response.data) as AddressType;
  } catch (error: any) {
    console.log(error.message);
  }
};

const getAddresses = async (userId: string) => {
  try {
    const response = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', userId);
    return convertToCamelcase(response.data) as AddressType[];
  } catch (error: any) {
    console.log(error.message);
  }
};

const getDefaultAddresses = async (userId: string) => {
  try {
    const response = await supabase
      .from('addresses')
      .select()
      .eq('is_default', true)
      .eq('user_id', userId);
    return convertToCamelcase(response.data) as AddressType[];
  } catch (error: any) {
    console.log(error.message);
  }
};

const getDefaultBillingAddresses = async (userId: string) => {
  try {
    const response = await supabase
      .from('addresses')
      .select('*')
      .eq('is_default', true)
      .eq('is_billing', true)
      .eq('user_id', userId);
    return convertToCamelcase(response.data) as AddressType[];
  } catch (error: any) {
    console.log(error.message);
  }
};

const getDefaultShippingAddresses = async (userId: string) => {
  try {
    const response = await supabase
      .from('addresses')
      .select('*')
      .eq('is_default', true)
      .eq('is_billing', false)
      .eq('user_id', userId);
    return convertToCamelcase(response.data) as AddressType[];
  } catch (error: any) {
    console.log(error.message);
  }
};

const setDefaultBilling = async (id: number) => {
  try {
    const user = await getUser();
    if (user) {
      const defaultAddresses = await getDefaultBillingAddresses(user?.id);
      if (defaultAddresses) {
        defaultAddresses.forEach((defaultAddress) => {
          if (defaultAddress.id) {
            updateAddress(defaultAddress.id, { isDefault: false });
          }
        });
      }

      const response = await updateAddress(id, {
        isDefault: true,
        isBilling: true
      });
      return convertToCamelcase(response);
    }
  } catch (error: any) {
    console.log(error.message);
  }
};

const setDefaultShipping = async (id: number) => {
  try {
    const user = await getUser();
    if (user) {
      const defaultAddresses = await getDefaultShippingAddresses(user?.id);
      if (defaultAddresses) {
        defaultAddresses.forEach((defaultAddress) => {
          if (defaultAddress.id) {
            updateAddress(defaultAddress.id, { isDefault: false });
          }
        });
      }

      const response = await updateAddress(id, {
        isDefault: true,
        isBilling: false
      });
      return convertToCamelcase(response);
    }
  } catch (error: any) {
    console.log(error.message);
  }
};

export const addressApi = {
  addAddress,
  deleteAddress,
  getAddressById,
  getAddresses,
  getDefaultAddresses,
  updateAddress,
  setDefaultBilling,
  setDefaultShipping
};
