import * as React from 'react';
import SpeedDialAction from '@mui/material/SpeedDialAction';
// import SaveIcon from '@mui/icons-material/Save';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { FC, useState } from 'react';
import ConfirmModal from '@/components/modal/confirm-modal';
import { StyledSpeedDial } from '@/components/speed-dial';
import { CategoryType } from '@/types/category';

type CategorySpeedDialProps = {
  remove: Function;
  edit: Function;
  category: CategoryType;
  enable: Function;
  disable: Function;
};

const CategorySpeedDial: FC<CategorySpeedDialProps> = ({
  remove,
  edit,
  category,
  enable,
  disable
}) => {
  const [confirmIsOpen, setConfirmIsOpen] = useState(false);

  const confirmDeleteOnClose = (confirmed: boolean) => {
    setConfirmIsOpen(false);
    if (confirmed) {
      remove(category?.id);
    }
  };

  const confirmDelete = () => {
    setConfirmIsOpen(true);
  };

  const actions = [
    {
      icon: <EditIcon />,
      name: 'Edit',
      action: () => edit(category),
      actionName: 'edit'
    },
    {
      icon: <DeleteIcon />,
      name: 'Delete',
      action: () => confirmDelete(),
      actionName: 'delete'
    },
    {
      icon: <CheckCircleOutlineIcon />,
      name: 'Disable',
      action: () => disable(category.id),
      actionName: 'disable'
    },
    {
      icon: <CheckCircleOutlineIcon />,
      name: 'Enable',
      action: () => enable(category.id),
      actionName: 'enable'
    }
  ];

  return (
    <>
      <StyledSpeedDial
        ariaLabel="Category Actions SpeedDial"
        hidden={false}
        icon={<MoreVertIcon />}
        direction={'left'}
        className="dashboard-speeddial"
      >
        {actions.map((action) => {
          return (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.action}
            />
          );
        })}
      </StyledSpeedDial>
      <ConfirmModal onClose={confirmDeleteOnClose} open={confirmIsOpen} />
    </>
  );
};
export default CategorySpeedDial;
