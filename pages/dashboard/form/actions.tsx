import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import SpeedDial, { SpeedDialProps } from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
//import SaveIcon from '@mui/icons-material/Save';
//import PrintIcon from '@mui/icons-material/Print';
//import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { FC, useState } from 'react';
import { AddressType } from '@/types';
import ConfirmModal from '@/components/modal/confirm-modal';
import { tokens } from '@/theme';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => {
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

type Props = {
  deleteAddress: Function;
  setDefaultBilling: Function;
  setDefaultShipping: Function;
  edit: Function;
  address: AddressType;
};

const AddressSpeedDial: FC<Props> = ({
  deleteAddress,
  setDefaultBilling,
  setDefaultShipping,
  edit,
  address
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [confirmIsOpen, setConfirmIsOpen] = useState(false);

  const confirmDeleteOnClose = (confirmed: boolean) => {
    setConfirmIsOpen(false);
    if (confirmed) {
      deleteAddress(address?.id);
    }
  };

  const confirmDelete = () => {
    setConfirmIsOpen(true);
  };

  const actions = [
    {
      icon: <EditIcon />,
      name: 'Edit',
      action: () => edit(address),
      actionName: 'edit'
    },
    {
      icon: <DeleteIcon />,
      name: 'Delete',
      action: () => confirmDelete(),
      actionName: 'delete'
    },
    {
      icon: <CheckCircleIcon />,
      name: 'Set Default Billing',
      action: () => setDefaultBilling(address.id),
      actionName: 'setDefaultBilling'
    },
    {
      icon: <CheckCircleOutlineIcon />,
      name: 'Set Default Shipping',
      action: () => setDefaultShipping(address.id),
      actionName: 'setDefaultShipping'
    }
  ];

  return (
    <>
      <StyledSpeedDial
        ariaLabel="Address Actions SpeedDial"
        hidden={false}
        icon={<MoreVertIcon />}
        direction={'left'}
        className="dashboard-speeddial"
      >
        {actions.map((action) => {
          if (
            action.actionName === 'edit' ||
            (action.actionName === 'delete' &&
              (!address.isDefault as boolean)) ||
            (action.actionName === 'setDefaultBilling' &&
              (!address.isDefault as boolean)) ||
            (action.actionName === 'setDefaultShipping' &&
              (!address.isDefault as boolean))
          ) {
            return (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={action.action}
              />
            );
          }
        })}
      </StyledSpeedDial>
      <ConfirmModal onClose={confirmDeleteOnClose} open={confirmIsOpen} />
    </>
  );
};
export default AddressSpeedDial;
