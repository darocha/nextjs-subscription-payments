import DashboardLayout from '@/components/DashboardLayout';
import { ReactNode, useEffect } from 'react';
import { useAtom } from 'jotai';
import { productAtom, productsAtom } from '@/atoms/product';
import { productApi } from '@/pages/api/products';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next/types';
import { LayoutComponent } from '../../../../types/next';
import { EditProductForm } from './edit';
import { ProductType } from '@/types/nft';

interface Props extends LayoutComponent {
  product: ProductType;
  user: any;
}

const AddEditProductPage: LayoutComponent<Props> = ({ product, user }) => {
  const [, setProduct] = useAtom(productAtom);
  //const [, setProducts] = useAtom(productsAtom);

  useEffect(() => {
    setProduct(product);
    //setProducts([product]);
  }, []);

  return (
    <EditProductForm
      user={user}
      product={product}
      title="Edit Product"
      buttonLabel="Save"
    />
  );
};

AddEditProductPage.getLayout = (page: ReactNode) => (
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
  const productId = ctx.params?.productId;

  const product = productId
    ? await productApi.getProduct(productId as string, user.id)
    : null;

  return { props: { product, user } };
};

export default AddEditProductPage;
