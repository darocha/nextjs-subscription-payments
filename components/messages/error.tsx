import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useAtom } from 'jotai';
import { errorMessageAtom, showErrorMessageAtom } from '@/atoms/messages';

export default function ErrorMessage() {
  const [errorMessage, _setErrorMessage] = useAtom(errorMessageAtom);
  const [open, setOpen] = useAtom(showErrorMessageAtom);

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {errorMessage || 'Ooops! There was an error.'}
        </Alert>
      </Collapse>
    </Box>
  );
}
