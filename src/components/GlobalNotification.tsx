import { AlertProps, default as MuiAlert } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function GlobalNotification() {
  const theme = useTheme();

  const [showSnackbar, setShowSnackbar] = useState(false);

  // useEffect(() => {
  //   setShowSnackbar(true);
  // }, []);

  const handleClose = () => {
    setShowSnackbar(false);
  };

  return (
    <>
      {showSnackbar && (
        <Snackbar
          open={true}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            severity="success"
            sx={{
              backgroundColor: theme.palette.success.main,
              color: theme.palette.common.white,
              '& .MuiAlert-icon': {
                marginRight: theme.spacing(1),
              },
            }}
          >
            This is a dummy notification message
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

export default GlobalNotification;
