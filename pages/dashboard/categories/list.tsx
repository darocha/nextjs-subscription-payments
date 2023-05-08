import Header from '@/components/Header';
import { ProductType } from '@/types/nft';
import { Box, IconButton, useTheme } from '@mui/material';
import { FC, useState } from 'react';
// import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import Image from 'next/image';
import { useAtom } from 'jotai';
import AppModal from '@/components/modal';
import ProductForm from './form';
import CategoryActions from './actions';
import { productApi } from '@/pages/api/products';
import { tokens } from '@/theme';
import Grid from '@/components/products/grid';
import { ButtonGroup } from '@/components/products/button-group';
import { CategoryType } from '@/types/category';
import {
  categoryModalAtom,
  categoriesAtom,
  categoryAtom
} from '@/atoms/categories';
import { categoryApi } from '@/pages/api/categories';
import TreeView from '@/components/tree';

type CategoryListProps = {
  user: any;
  categoriesArr: CategoryType[];
};

export const CategoryList: FC<CategoryListProps> = ({
  user,
  categoriesArr
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setModalOpen] = useAtom(categoryModalAtom);
  const [categories, setCategories] = useAtom(categoriesAtom);
  const [category, setCategory] = useAtom(categoryAtom);

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
    <>
      <Box
        className="dashboard-box large my-10"
        sx={{ background: colors.dashboard.window.background }}
      >
        <Box className="dashboard-box-header justify-between items-center flex">
          <Header
            title="Your Categories"
            subtitle="Manage your categories"
            variant="h4"
            subtitleVariant="h6"
            fontWeight="normal"
          />
          {/* <div className="flex   items-center justify-center w-full">
            <ButtonGroup selected={viewMode} onClick={setViewMode} />
          </div> */}
          <div className="w-full flex justify-end">
            <Link href="/dashboard/categories/add">
              <button
                type="button"
                className={`inline-flex bg-slate-600 items-center  px-4 py-2 text-sm font-medium text-gray-400 rounded-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white  dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700`}
              >
                Add Category
              </button>
            </Link>
          </div>
        </Box>
        <Box className="dashboard-box-body">
          {categories &&
            categories.map((category, i) => {
              return (
                <div key={`category_${i}`}>
                  <Category
                    category={category}
                    edit={edit}
                    remove={remove}
                    enable={enable}
                    disable={disable}
                  />
                </div>
              );
            })}

          {!categories ||
            (categories.length === 0 && (
              <div className="flex text-center p-50 py-[50px] w-full justify-center">
                <div>There are no categories</div>
              </div>
            ))}
          <TreeView />
        </Box>
      </Box>

      {/* <AppModal onClose={onClose} open={open}>
        <ProductForm
          onSubmit={onSubmit}
          onClose={onClose}
          product={product}
          user={user}
        />
      </AppModal> */}
    </>
  );
};

type CategoryProps = {
  category: CategoryType;
  edit: (category: CategoryType) => void;
  remove: (id: string) => void;
  disable: (id: string) => void;
  enable: (id: string) => void;
};
const Category: FC<CategoryProps> = ({
  category,
  edit,
  remove,
  disable,
  enable
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      className="dashboard-list-item justify-between flex"
      sx={{ background: colors.dashboard.listItem.background }}
    >
      <div className="min-w-[100px] min-h-[100px] flex overflow-hidden  bg-slate-500">
        <Link href={'/dashboard/products'}>
          <Image
            src={'/images/nfts/1.png'}
            height={100}
            width={100}
            alt={'Product Picture'}
            //fill={false}
            // objectFit="contain"
            // objectFit="cover"
          />
        </Link>
      </div>
      <div className="flex justify-between items-center w-full pl-2">
        <div>
          <div className="px-2 mb-5 gap-2 opacity-30 flex">
            <span className="rounded-md bg-zinc-300 font-semibold text-gray-800 px-3 py-0">
              digital
            </span>
            <span className="rounded-md bg-zinc-300 font-semibold text-gray-800 px-3 py-0">
              nft
            </span>
          </div>

          <div className="px-2">{category.name}</div>
          <div className="px-2">{category.taxonomy}</div>

          {/* <div className="mt-4 gap-2 flex text-gray-300">
            <span className="px-2">
              {category.views} <span className="text-gray-500">Likes</span>
            </span>
          </div> */}
        </div>

        <div className="dashboard-circle-button">
          <CategoryActions
            category={category}
            edit={edit}
            remove={remove}
            enable={enable}
            disable={disable}
          />
        </div>
      </div>
    </Box>
  );
};
