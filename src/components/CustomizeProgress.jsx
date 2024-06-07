import React from 'react';
import { CircularProgress, Backdrop } from '@mui/material';

export const CustomizeProgress = ({ isOpen, handleClose }) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isOpen}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default CustomizeProgress;
