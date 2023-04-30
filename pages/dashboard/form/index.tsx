import DashboardLayout from '@/components/DashboardLayout';
import { ReactNode, useEffect } from 'react';
import { useAtom } from 'jotai';
import { addressesAtom } from '@/atoms/address';
import { addressApi } from '@/pages/api/addresses';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

import { GetServerSidePropsContext } from 'next/types';
import { LayoutComponent } from '../../../types/next';
import { AddressType } from '@/types';
import { AddressList } from './list';

interface Props extends LayoutComponent {
  addressesArr: AddressType[];
  user: any;
}

const AddressesPage: LayoutComponent<Props> = ({ addressesArr, user }) => {
  const [, setAddresses] = useAtom(addressesAtom);

  useEffect(() => {
    setAddresses(addressesArr);
  }, []);

  return <AddressList user={user} />;
};

AddressesPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: '/signin',
        permanent: false
      }
    };

  const user = session.user;
  const addressesArr = await addressApi.getAddresses(user.id);

  return { props: { addressesArr, user } };
};

export default AddressesPage;
