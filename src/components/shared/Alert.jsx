import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const CustomizeAlert = ({isOpen,message,handleClose,severity}) => {
  return (
    <div>
        <Snackbar open={isOpen} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
            {message}   
            </Alert>
        </Snackbar>
    </div>
  )
}

export default CustomizeAlert
