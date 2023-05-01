import * as React from 'react';
import SpeedDialAction from '@mui/material/SpeedDialAction';
// import SaveIcon from '@mui/icons-material/Save';
// import PrintIcon from '@mui/icons-material/Print';
// import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { FC, useState } from 'react';
import ConfirmModal from '@/components/modal/confirm-modal';
import { ProductType } from '@/types/nft';
import { StyledSpeedDial } from '@/components/speed-dial';

type Props = {
  deleteProduct: Function;
  edit: Function;
  product: ProductType;
  publish: Function;
  delist: Function;
  backorder: Function;
};

const ProductSpeedDial: FC<Props> = ({
  deleteProduct,
  edit,
  product,
  publish,
  delist,
  backorder
}) => {
  const [confirmIsOpen, setConfirmIsOpen] = useState(false);

  const confirmDeleteOnClose = (confirmed: boolean) => {
    setConfirmIsOpen(false);
    if (confirmed) {
      deleteProduct(product?.id);
    }
  };

  const confirmDelete = () => {
    setConfirmIsOpen(true);
  };

  const actions = [
    {
      icon: <EditIcon />,
      name: 'Edit',
      action: () => edit(product),
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
      name: 'Delist',
      action: () => delist(product.id),
      actionName: 'delist'
    },
    {
      icon: <CheckCircleOutlineIcon />,
      name: 'Publish',
      action: () => publish(product.id),
      actionName: 'publish'
    },
    {
      icon: <CheckCircleOutlineIcon />,
      name: 'Backorder',
      action: () => backorder(product.id),
      actionName: 'backorder'
    }
  ];

  return (
    <>
      <StyledSpeedDial
        ariaLabel="Product Actions SpeedDial"
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
export default ProductSpeedDial;
