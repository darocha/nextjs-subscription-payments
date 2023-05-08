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
import CategoryForm from '../form';
import { categoryApi } from '@/pages/api/categories';
import {
  categoriesAtom,
  categoryAtom,
  categoryModalAtom
} from '@/atoms/categories';
import { CategoryType } from '@/types/category';

type EditProductFormProps = {
  user: any;
  category: CategoryType;
  title?: string;
  buttonLabel?: string;
  subtitle?: string;
  displayHeader?: boolean;
};

export const EditCategoryForm: FC<EditProductFormProps> = ({
  user,
  category,
  title = '',
  subtitle = '',
  buttonLabel = 'Submit',
  displayHeader = false
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setModalOpen] = useAtom(categoryModalAtom);
  const [categories, setCategories] = useAtom(categoriesAtom);
  const [, setCategory] = useAtom(categoryAtom);

  const openModal = () => {
    setModalOpen(true);
  };

  const onClose = () => {
    setModalOpen(false);
    setCategory(null);
  };

  const edit = (category: CategoryType) => {
    setCategory(category);
    openModal();
  };

  const onSubmit = () => {
    setModalOpen(false);
    setCategory(null);
  };

  const remove = (id: string) => {
    const updatedCategories = categories?.filter((a) => a.id !== id);
    setCategories([...(updatedCategories || [])]);
    categoryApi.delete(id);
  };

  const enable = (id: string) => {};
  const disable = (id: string) => {};

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
          {/* <button
            type="button"
            //onClick={openModal}
            className={`inline-flex bg-slate-600 items-center  px-4 py-2 text-sm font-medium text-gray-400 rounded-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white  dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700`}
          >
            Save
          </button> */}
        </div>
      </Box>

      <CategoryForm
        onSubmit={onSubmit}
        onClose={onClose}
        category={category}
        user={user}
        displayHeader={displayHeader}
        title={title}
        subtitle={subtitle}
        buttonLabel={buttonLabel}
      />

      {/* <Box className="dashboard-box-body">
        <Grid items={products || []} />
      </Box> */}
    </Box>
  );
};
