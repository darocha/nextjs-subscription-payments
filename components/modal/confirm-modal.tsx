import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';

export interface Props {
  open: boolean;
  onClose: (confirmed: boolean) => void;
}

export default function ConfirmationDialog(props: Props) {
  const { onClose, open } = props;

  const handleEntering = () => {};

  const handleCancel = () => {
    onClose(false);
  };

  const handleOk = () => {
    onClose(true);
  };

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          width: '80%',
          maxHeight: 435,
          background: '#fff',
          color: '#111'
        }
      }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
    >
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>Do you want to delete this address?</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          No
        </Button>
        <Button onClick={handleOk}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}
