// @ts-nocheck
import { Typography, Box, useTheme } from '@mui/material';
import { tokens } from '../theme';

const Header = ({
  title = '',
  subtitle = '',
  variant = 'h2',
  fontWeight = 'bold',
  subtitleVariant = 'h5'
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box className="w-full flex items-center">
      <div>
        <Typography
          variant={variant}
          color={colors.grey[100]}
          fontWeight={fontWeight}
          sx={{ m: '0 0 5px 0' }}
        >
          {title}
        </Typography>
        <Typography variant={subtitleVariant} color={colors.greenAccent[400]}>
          {subtitle}
        </Typography>
      </div>
    </Box>
  );
};

export default Header;
