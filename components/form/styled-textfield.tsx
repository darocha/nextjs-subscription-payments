import { tokens } from '@/theme';
import styled from '@emotion/styled';
import {
  useTheme,
  OutlinedInputProps,
  TextField,
  TextFieldProps
} from '@mui/material';

const StyledTextField = styled((props: TextFieldProps) => (
  <TextField
    InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
    {...props}
  />
))(() => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return {
    '& .MuiFilledInput-root': {
      border: `1px solid ${colors.dashboard.textField.border.default}`,
      overflow: 'hidden',
      borderRadius: 4,
      backgroundColor: colors.dashboard.textField.background.main,
      color: colors.dashboard.textField.color,
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow'
      ]),
      '&:hover': {
        backgroundColor: colors.dashboard.textField.background.darker
      },
      '&.Mui-focused': {
        backgroundColor: colors.dashboard.textField.background.darker,
        color: colors.dashboard.textField.color
      },
      '&.Mui-error': {
        borderColor: colors.dashboard.textField.border.error.default
      }
    },
    '& .MuiFormLabel-root.MuiInputLabel-root': {
      color: colors.dashboard.textField.label.color,
      '&.Mui-error': {
        color: colors.dashboard.textField.border.error.default
      }
    }
  };
});
export default StyledTextField;
