import DashboardLayout from '@/components/DashboardLayout';
import { ReactNode } from 'react';
import { GetServerSidePropsContext } from 'next/types';
import { LayoutComponent } from '../../../../types/next';

const EditIndexPage: LayoutComponent = () => {
  return <></>;
};

EditIndexPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    redirect: {
      destination: '/dashboard/products',
      permanent: false
    }
  };
};

export default EditIndexPage;
