import Header from '@/components/Header';
import { ProductType } from '@/types/nft';
import { Box, IconButton, useTheme } from '@mui/material';
import { FC, useState } from 'react';
// import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import Image from 'next/image';
import { useAtom } from 'jotai';
import { productAtom, productModalAtom, productsAtom } from '@/atoms/product';
import AppModal from '@/components/modal';
import ProductForm from '../form';
import { productApi } from '@/pages/api/products';
import { tokens } from '@/theme';
import Grid from '@/components/products/grid';
import { ButtonGroup } from '@/components/products/button-group';

type EditProductFormProps = {
  user: any;
  product: ProductType;
  title?: string;
  buttonLabel?: string;
  subtitle?: string;
  displayHeader?: boolean;
};

export const EditProductForm: FC<EditProductFormProps> = ({
  user,
  product,
  title = '',
  subtitle = '',
  buttonLabel = 'Submit',
  displayHeader = false
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setModalOpen] = useAtom(productModalAtom);
  const [products, setProducts] = useAtom(productsAtom);
  const [, setProduct] = useAtom(productAtom);
  const [viewMode, setViewMode] = useState<number>(1);

  const openModal = () => {
    setModalOpen(true);
  };

  const onClose = () => {
    setModalOpen(false);
    setProduct(null);
  };

  const editProduct = (product: ProductType) => {
    setProduct(product);
    openModal();
  };

  const onSubmit = () => {
    setModalOpen(false);
    setProduct(null);
  };

  const deleteProduct = (id: string) => {
    const updatedProducts = products?.filter((a) => a.id !== id);
    setProducts([...(updatedProducts || [])]);
    productApi.deleteProduct(id);
  };

  const delistProduct = (id: string) => {};
  const publishProduct = (id: string) => {};
  const backorderProduct = (id: string) => {};

  return (
    <Box
      className="dashboard-box medium my-10"
      sx={{ background: colors.dashboard.window.background }}
    >
      <Box className="dashboard-box-header justify-between items-center flex">
        <Header
          title={title}
          subtitle={subtitle}
          variant="h4"
          subtitleVariant="h6"
          fontWeight="normal"
        />
        <div className="w-full flex justify-end">
          <button
            type="button"
            //onClick={openModal}
            className={`inline-flex bg-slate-600 items-center  px-4 py-2 text-sm font-medium text-gray-400 rounded-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white  dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700`}
          >
            Save and Publish
          </button>
        </div>
      </Box>

      <ProductForm
        onSubmit={onSubmit}
        onClose={onClose}
        product={product}
        user={user}
        displayHeader={displayHeader}
        title={title}
        subtitle={subtitle}
        buttonLabel={buttonLabel}
      />

      <Box className="dashboard-box-body">
        <Grid items={products || []} />
      </Box>
    </Box>
  );
};
