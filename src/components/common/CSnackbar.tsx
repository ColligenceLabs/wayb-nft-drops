import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
// import Alert from '@mui/material/Alert';

type SnackbarProps = {
  open: boolean;
  type: string;
  message: string;
  handleClose: () => void;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CSnackbar: React.FC<SnackbarProps> = ({
  open,
  type = 'success',
  message,
  handleClose,
}) => {
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={handleClose}
      >
        <Alert severity={type as AlertColor} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      {/*<Alert severity="error">This is an error message!</Alert>*/}
      {/*<Alert severity="warning">This is a warning message!</Alert>*/}
      {/*<Alert severity="info">This is an information message!</Alert>*/}
      {/*<Alert severity="success">This is a success message!</Alert>*/}
    </>
  );
};

export default CSnackbar;
