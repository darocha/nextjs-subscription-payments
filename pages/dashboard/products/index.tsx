import DashboardLayout from '@/components/DashboardLayout';
import { ReactNode, useEffect } from 'react';
import { useAtom } from 'jotai';
import { productsAtom } from '@/atoms/product';
import { productApi } from '@/pages/api/products';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next/types';
import { LayoutComponent } from '../../../types/next';
import { ProductsList } from './list';
import { ProductType } from '@/types/nft';

interface Props extends LayoutComponent {
  productsArr: ProductType[];
  user: any;
}

const ProductsPage: LayoutComponent<Props> = ({ productsArr, user }) => {
  const [, setProducts] = useAtom(productsAtom);

  useEffect(() => {
    setProducts(productsArr);
  }, []);

  return <ProductsList user={user} />;
};

ProductsPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false
      }
    };
  }
  const user = session?.user;
  const productsArr = await productApi.getMockProducts(user.id);

  return { props: { productsArr, user } };
};

export default ProductsPage;
