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
import { StyledSelect } from '@/components/form/styled-select';
import { ProductType } from '@/types/nft';
import { productApi } from '@/pages/api/products';

interface Props {
  product?: ProductType | null;
  user: any;
  onClose?: Function;
  onSubmit?: Function;
  displayHeader: boolean;
  title: string;
  subtitle: string;
  buttonLabel: string;
}

const Form: FC<Props> = ({
  product,
  user,
  onSubmit,
  displayHeader = true,
  title = 'Title',
  subtitle = 'Subtitle',
  buttonLabel = 'Submit'
}) => {
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
    id: product?.id || undefined,
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
    lastPriceUSD: product?.lastPriceUSD || 0,
    lastPriceAmount: product?.lastPriceToken || '',
    lastPriceToken: product?.lastPriceToken || '',
    topBidPriceUSD: product?.topBidPriceUSD || 0,
    topBidPriceAmount: product?.topBidPriceToken || '',
    topBidPriceToken: product?.topBidPriceToken || '',
    priceUSD: product?.priceUSD || 0,
    priceAmount: product?.priceAmount || '',
    priceToken: product?.priceToken || '',
    offerPriceUSD: product?.offerPriceUSD || 0,
    offerPriceAmount: product?.offerPriceAmount || '',
    offerPriceToken: product?.offerPriceToken || ''
  };

  return (
    <div
      className="flex justify-center dashboard-form"
      style={{ background: colors.dashboard.window.background }}
    >
      <Box m="0px" className="sm:w-full md:w-[600px] mx-auto">
        {displayHeader && (
          <Box className="dashboard-form-header">
            <Header
              title={title}
              subtitle={subtitle}
              variant="h4"
              subtitleVariant="h6"
              fontWeight="normal"
            />
          </Box>
        )}

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
                className="grid-cols-4"
                display="grid"
                gap="30px"
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
                  minRows={10}
                  multiline={true}
                  name="description"
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                  sx={{ gridColumn: 'span 4' }}
                />

                <StyledSelect
                  label="Product Type"
                  name="productType"
                  options={['Digital Product', 'Physical Product', 'NFT Asset']}
                  value={values.title as string}
                  onChange={handleChange}
                  gridColumn={isMobile ? 'span 4' : 'span 2'}
                />

                <FormControlLabel
                  sx={{ gridColumn: 'span 4' }}
                  control={
                    <Checkbox
                      checked={!!values?.live}
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
                  {buttonLabel}
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
  // firstName: yup.string().required('First Name is required'),
  // lastName: yup.string().required('Last Name is required'),
  //email: yup.string().email('invalid email').required('required'),
  // contact: yup
  //   .string()
  //   .matches(phoneRegExp, 'Phone number is not valid')
  //   .required('required'),
  // line1: yup.string().required('Product Line 1 is required'),
  // city: yup.string().required('City is required'),
  // state: yup.string().required('State is required'),
  // country: yup.string().required('Country is required'),
  // zipCode: yup
  //   .string()
  //   .matches(/^[0-9]{5}$/, 'Zip Code must be 5 digits')
  //   .required('Zip Code is required')
});

export default Form;
