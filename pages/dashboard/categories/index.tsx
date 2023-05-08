import DashboardLayout from '@/components/DashboardLayout';
import { ReactNode, useEffect } from 'react';
import { useAtom } from 'jotai';
import { productsAtom } from '@/atoms/product';
import { productApi } from '@/pages/api/products';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next/types';
import { LayoutComponent } from '../../../types/next';
import { CategoryList } from './list';
import { ProductType } from '@/types/nft';
import { categoriesAtom } from '@/atoms/categories';
import { CategoryType } from '@/types/category';
import { categoryApi } from '@/pages/api/categories';

interface Props extends LayoutComponent {
  categoriesArr: CategoryType[];
  user: any;
}

const CategoriesPage: LayoutComponent<Props> = ({ categoriesArr, user }) => {
  const [, setCategories] = useAtom(categoriesAtom);

  useEffect(() => {
    setCategories(categoriesArr);
  }, []);

  return <CategoryList user={user} categoriesArr={categoriesArr} />;
};

CategoriesPage.getLayout = (page: ReactNode) => (
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
  const categoriesArr = await categoryApi.getAll(user.id);

  return { props: { categoriesArr, user } };
};

export default CategoriesPage;
