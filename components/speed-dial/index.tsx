import { tokens } from '@/theme';
import { SpeedDial } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledSpeedDial = styled(SpeedDial)(({ theme }) => {
  const colors = tokens(theme.palette.mode);
  return {
    '& .MuiFab-root': {
      background: colors.dashboard.fab.background,
      color: colors.dashboard.fab.color,
      '&:hover': {
        background: colors.dashboard.fab.hover.background,
        color: colors.dashboard.fab.hover.color
      }
    },
    '& .MuiSpeedDialAction-fab': {
      background: colors.dashboard.fab.fab.background,
      color: colors.dashboard.fab.fab.color,
      '&:hover': {
        background: colors.dashboard.fab.fab.hover.background,
        color: colors.dashboard.fab.fab.hover.color
      }
    },
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      position: 'absolute',
      right: '0'
    }
  };
});
