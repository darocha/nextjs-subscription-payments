import {
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  useTheme
} from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../../components/Header';
import { FC } from 'react';
import { useAtom } from 'jotai';
import { productAtom, productsAtom } from '@/atoms/product';
import { tokens } from '@/theme';
import StyledTextField from '@/components/form/styled-textfield';
import { ProductType } from '@/types/nft';
import { productApi } from '@/pages/api/products';

interface Props {
  product?: ProductType | null;
  user: any;
  onClose?: Function;
  onSubmit?: Function;
}

const Form: FC<Props> = ({ product, user, onSubmit }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [, setProducts] = useAtom(productsAtom);
  const [, setProduct] = useAtom(productAtom);

  const handleFormSubmit = async (values: ProductType) => {
    if (values && product && product.id) {
      await productApi.updateProduct(product.id, values);
    } else {
      await productApi.addProduct(values);
    }

    setProduct(null);

    const productArr = await productApi.getProducts(user.id);

    if (productArr) {
      setProducts(productArr);
    }

    if (onSubmit) {
      onSubmit();
    }
  };

  const initialValues: ProductType = {
    id: product?.id || null,
    live: product?.live || false,
    isDeleted: product?.isDeleted || false,
    number: product?.number || 0,
    title: product?.title || '',
    owner: product?.owner || '',
    seller: product?.seller || '',
    url: product?.url || '',
    images: product?.images || [],
    description: product?.description || '',
    contractAddress: product?.contractAddress || '',
    collectionName: product?.collectionName || '',
    collectionUrl: product?.collectionUrl || '',
    imageUrl: product?.imageUrl || '',
    videoUrl: product?.videoUrl || '',
    verified: product?.verified || false,
    endDate: product?.endDate || '',
    startDate: product?.startDate || '',
    available: product?.available || false,
    isAuction: product?.isAuction || false,
    isOnSale: product?.isOnSale || false,
    lastPrice: product?.lastPrice || { usd: 0, amount: '', token: '' },
    topBidPrice: product?.topBidPrice || { usd: 0, amount: '', token: '' },
    price: product?.price || { usd: 0, amount: '', token: '' },
    offerPrice: product?.offerPrice || { usd: 0, amount: '', token: '' }
  };

  return (
    <div
      className="flex justify-center dashboard-form"
      style={{ background: colors.dashboard.window.background }}
    >
      <Box m="0px" className="sm:w-full md:w-[600px] mx-auto">
        <Box className="dashboard-form-header">
          <Header
            title="Add Product"
            subtitle="Add a New Product"
            variant="h4"
            subtitleVariant="h6"
            fontWeight="normal"
          />
        </Box>

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  '& > div': {
                    gridColumn: isMobile ? 'span 4' : undefined
                  }
                }}
              >
                <StyledTextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.title}
                  name="title"
                  error={!!touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
                  sx={{
                    gridColumn: 'span 4'
                  }}
                />
                <StyledTextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  name="description"
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                  sx={{ gridColumn: 'span 4' }}
                />
                <FormControlLabel
                  sx={{ gridColumn: 'span 2' }}
                  control={
                    <Checkbox
                      checked={values.live}
                      value={values.live}
                      onChange={handleChange}
                      // disabled={initialValues.live}
                      name="live"
                      color="secondary"
                    />
                  }
                  label="Live"
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Save Product
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </div>
  );
};

const validationSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  //email: yup.string().email('invalid email').required('required'),
  // contact: yup
  //   .string()
  //   .matches(phoneRegExp, 'Phone number is not valid')
  //   .required('required'),
  line1: yup.string().required('Product Line 1 is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  country: yup.string().required('Country is required'),
  zipCode: yup
    .string()
    .matches(/^[0-9]{5}$/, 'Zip Code must be 5 digits')
    .required('Zip Code is required')
});

export default Form;
