import DashboardLayout from '@/components/DashboardLayout';
import { ReactNode } from 'react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next/types';
import { LayoutComponent } from '../../../../types/next';
import { EditCategoryForm } from '../edit/edit';
import { CategoryType } from '@/types/category';

interface Props extends LayoutComponent {
  user: any;
  category: CategoryType;
}

const AddCategoryPage: LayoutComponent<Props> = ({ user, category }) => {
  return (
    <EditCategoryForm
      user={user}
      category={category}
      title="Add Category"
      buttonLabel="Save"
    />
  );
};

AddCategoryPage.getLayout = (page: ReactNode) => (
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

  return { props: { user } };
};

export default AddCategoryPage;
