import DashboardLayout from '@/components/DashboardLayout';
import { ReactNode, useEffect } from 'react';
import { useAtom } from 'jotai';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next/types';
import { LayoutComponent } from '../../../../types/next';
import { EditCategoryForm } from './edit';
import { categoryApi } from '@/pages/api/categories';
import { categoryAtom } from '@/atoms/categories';
import { CategoryType } from '@/types/category';

interface Props extends LayoutComponent {
  category: CategoryType;
  user: any;
}

const EditCategoryPage: LayoutComponent<Props> = ({ category, user }) => {
  const [, setCategory] = useAtom(categoryAtom);

  useEffect(() => {
    if (category) {
      setCategory(category);
    }
  }, []);

  return (
    <EditCategoryForm
      user={user}
      category={category}
      title="Edit Category"
      buttonLabel="Save"
    />
  );
};

EditCategoryPage.getLayout = (page: ReactNode) => (
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
  const categoryId = ctx.params?.categoryId;

  const category = categoryId
    ? await categoryApi.get(categoryId as string)
    : null;

  return { props: { category, user } };
};

export default EditCategoryPage;
