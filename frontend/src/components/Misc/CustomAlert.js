import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const CustomAlert = ({ alertData, setAlertData }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertData({
      ...alertData,
      "showAlert": false
    });
  };

  return (
    <div>
      <Snackbar open={alertData.showAlert} autoHideDuration={6000} onClose={handleClose} >
        <Alert
          onClose={handleClose}
          severity={alertData.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertData.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomAlert;