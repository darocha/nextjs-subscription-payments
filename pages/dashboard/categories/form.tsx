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
import { CategoryType } from '@/types/category';
import { categoryApi } from '@/pages/api/categories';
import { categoryAtom } from '@/atoms/categories';

interface CategoryFormProps {
  category?: CategoryType | null;
  user: any;
  onClose?: Function;
  onSubmit?: Function;
  displayHeader: boolean;
  title: string;
  subtitle: string;
  buttonLabel: string;
}

const CategoryForm: FC<CategoryFormProps> = ({
  category,
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
  const [, setCategory] = useAtom(categoryAtom);

  const handleFormSubmit = async (values: CategoryType) => {
    if (values && category && category.id) {
      if (values.parent_id === 'None') {
        values.parent_id = null;
      }
      await categoryApi.update(category.id, values);
    } else {
      if (values.parent_id === 'None') {
        values.parent_id = null;
      }
      await categoryApi.add(values);
    }

    setCategory(null);

    if (onSubmit) {
      onSubmit();
    }
  };

  const initialValues: CategoryType = {
    id: category?.id || undefined,
    enabled: category?.enabled || false,
    url: category?.url || '',
    name: category?.name || '',
    parent_id: category?.parent_id || ''
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
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{
                    gridColumn: 'span 4'
                  }}
                />
                <StyledTextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Url"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.url}
                  // minRows={10}
                  // multiline={true}
                  name="url"
                  error={!!touched.url && !!errors.url}
                  helperText={touched.url && errors.url}
                  sx={{ gridColumn: 'span 4' }}
                />

                <StyledSelect
                  label="Parent Category"
                  name="parent_id"
                  options={['None']}
                  value={values.parent_id as string}
                  onChange={handleChange}
                  gridColumn={isMobile ? 'span 4' : 'span 2'}
                />

                <FormControlLabel
                  sx={{ gridColumn: 'span 4' }}
                  control={
                    <Checkbox
                      checked={!!values?.enabled}
                      value={values.enabled}
                      onChange={handleChange}
                      name="enabled"
                      color="secondary"
                    />
                  }
                  label="Enabled"
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

export default CategoryForm;
