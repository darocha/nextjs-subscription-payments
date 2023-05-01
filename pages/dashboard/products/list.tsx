import Header from '@/components/Header';
import { ProductType } from '@/types/nft';
import { Box, IconButton, useTheme } from '@mui/material';
import { FC } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import Image from 'next/image';
import { useAtom } from 'jotai';
import { productAtom, productModalAtom, productsAtom } from '@/atoms/product';
import AppModal from '@/components/modal';
import ProductForm from './form';
import ProductActions from './actions';
import { productApi } from '@/pages/api/products';
import { tokens } from '@/theme';
import Grid from '@/components/products/grid';

type Props = {
  user: any;
};

export const ProductsList: FC<Props> = ({ user }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setModalOpen] = useAtom(productModalAtom);
  const [products, setProducts] = useAtom(productsAtom);
  const [product, setProduct] = useAtom(productAtom);

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
    <>
      <Box
        className="dashboard-box medium my-10"
        sx={{ background: colors.dashboard.window.background }}
      >
        <Box className="dashboard-box-header">
          <Header
            title="Your Products"
            subtitle="Manage your physical and digital products"
            variant="h4"
            subtitleVariant="h6"
            fontWeight="normal"
          />

          <div className="dashboard-circle-button m-5 absolute">
            <IconButton onClick={openModal} type="button" sx={{ p: 1 }}>
              <AddIcon />
            </IconButton>
          </div>
        </Box>
        <Box className="dashboard-box-body">
          {products &&
            products.map((product, i) => {
              return (
                <div key={`product_${i}`}>
                  <Product
                    product={product}
                    editProduct={editProduct}
                    deleteProduct={deleteProduct}
                    publishProduct={publishProduct}
                    delistProduct={delistProduct}
                    backorderProduct={backorderProduct}
                  />
                </div>
              );
            })}

          {!products ||
            (products.length === 0 && (
              <div className="flex text-center p-50 py-[50px] w-full justify-center">
                <div>There are no productes here</div>
              </div>
            ))}
        </Box>
      </Box>
      <Grid items={products || []} />
      <AppModal onClose={onClose} open={open}>
        <ProductForm
          onSubmit={onSubmit}
          onClose={onClose}
          product={product}
          user={user}
        />
      </AppModal>
    </>
  );
};

type ProductProps = {
  product: ProductType;
  editProduct: (product: ProductType) => void;
  deleteProduct: (id: string) => void;
  delistProduct: (id: string) => void;
  publishProduct: (id: string) => void;
  backorderProduct: (id: string) => void;
};
const Product: FC<ProductProps> = ({
  product,
  editProduct,
  deleteProduct,
  delistProduct,
  publishProduct,
  backorderProduct
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
            <span className="rounded-md bg-zinc-300 text-gray-800 px-3 py-0">
              digital
            </span>
            <span className="rounded-md bg-zinc-300 text-gray-800 px-3 py-0">
              nft
            </span>
          </div>

          <div className="px-2">
            {product.title} {product.number ? `#${product.number}` : ''}
          </div>
          <div className="px-2">{product.description}</div>

          <div className="mt-4 gap-2 flex text-gray-300">
            <span className="px-2">
              {product.likes} <span className="text-gray-500">Views</span>
            </span>
            <span className="px-2">
              {product.views} <span className="text-gray-500">Likes</span>
            </span>
          </div>
        </div>

        <div className="dashboard-circle-button">
          <ProductActions
            product={product}
            edit={editProduct}
            deleteProduct={deleteProduct}
            publish={publishProduct}
            delist={delistProduct}
            backorder={backorderProduct}
          />
        </div>
      </div>
    </Box>
  );
};
