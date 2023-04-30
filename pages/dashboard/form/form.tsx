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
import { addressAtom, addressesAtom } from '@/atoms/address';
import { addressApi } from '@/pages/api/addresses';
import { AddressType } from '@/types';
import { tokens } from '@/theme';
import StyledTextField from '@/components/form/styled-textfield';

interface Props {
  address?: AddressType | null;
  user: any;
  onClose?: Function;
  onSubmit?: Function;
}

const Form: FC<Props> = ({ address, user, onSubmit }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [, setAddresses] = useAtom(addressesAtom);
  const [, setAddress] = useAtom(addressAtom);

  const handleFormSubmit = async (values: AddressType) => {
    if (values && address && address.id) {
      await addressApi.updateAddress(address.id, values);
    } else {
      await addressApi.addAddress(values);
    }

    setAddress(null);

    const addressArr = await addressApi.getAddresses(user.id);

    if (addressArr) {
      setAddresses(addressArr);
    }

    if (onSubmit) {
      onSubmit();
    }
  };

  const initialValues: AddressType = {
    firstName: address?.firstName || '',
    lastName: address?.lastName || '',
    line1: address?.line1 || '',
    line2: address?.line2 || '',
    city: address?.city || '',
    state: address?.state || '',
    country: address?.country || 'US',
    zipCode: address?.zipCode || '',
    isDefault: address?.isDefault || false,
    isBilling: address?.isBilling || false,
    email: address?.email || ''
  };

  return (
    <div
      className="flex justify-center dashboard-form"
      style={{ background: colors.dashboard.window.background }}
    >
      <Box m="0px" className="sm:w-full md:w-[600px] mx-auto">
        <Box className="dashboard-form-header">
          <Header
            title="Add Address"
            subtitle="Add a New Address"
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
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                  sx={{
                    gridColumn: 'span 2'
                  }}
                />
                <StyledTextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: 'span 2' }}
                />
                <StyledTextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Address Line 1"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.line1}
                  name="line1"
                  error={!!touched.line1 && !!errors.line1}
                  helperText={touched.line1 && errors.line1}
                  sx={{ gridColumn: 'span 4' }}
                />
                <StyledTextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Address Line 2"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.line2}
                  name="line2"
                  error={!!touched.line2 && !!errors.line2}
                  helperText={touched.line2 && errors.line2}
                  sx={{ gridColumn: 'span 4' }}
                />
                <StyledTextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="City"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.city}
                  name="city"
                  error={!!touched.city && !!errors.city}
                  helperText={touched.city && errors.city}
                  sx={{ gridColumn: 'span 4' }}
                />
                <StyledTextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="State"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.state}
                  name="state"
                  error={!!touched.state && !!errors.state}
                  helperText={touched.state && errors.state}
                  sx={{ gridColumn: 'span 4' }}
                />
                <StyledTextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Zip Code"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.zipCode}
                  name="zipCode"
                  error={!!touched.zipCode && !!errors.zipCode}
                  helperText={touched.zipCode && errors.zipCode}
                  sx={{ gridColumn: 'span 4' }}
                />
                <StyledTextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Country"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.country}
                  name="country"
                  error={!!touched.country && !!errors.country}
                  helperText={touched.country && errors.country}
                  sx={{ gridColumn: 'span 4' }}
                />
                <FormControlLabel
                  sx={{ gridColumn: 'span 2' }}
                  control={
                    <Checkbox
                      checked={values.isDefault}
                      value={values.isDefault}
                      onChange={handleChange}
                      disabled={initialValues.isDefault}
                      name="isDefault"
                      color="secondary"
                    />
                  }
                  label="Default Billing Address"
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Save Address
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
  line1: yup.string().required('Address Line 1 is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  country: yup.string().required('Country is required'),
  zipCode: yup
    .string()
    .matches(/^[0-9]{5}$/, 'Zip Code must be 5 digits')
    .required('Zip Code is required')
});

export default Form;
