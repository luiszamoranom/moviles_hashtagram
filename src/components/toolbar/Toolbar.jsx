import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import { Button, Drawer, Grid, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomNotification from "./Notification";
import { useState } from 'react';
import { DrawerNotifications } from './DrawerNotifications';

const ToolbarCustom = () => {

  const navigate = useNavigate();

  const [openNotifications, setOpenNotifications] = useState(false);

  const handleToggleNotifications = (open) => {
    setOpenNotifications(open);
  }

  return (
    <Grid container sx={{ height: "100%", width: "100vw" }}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "100vw",
          padding: "0",
        }}
      >
        <CustomNotification openNotifications={ handleToggleNotifications } />

        <Drawer
          anchor="top"
          open={openNotifications}
          onClose={() => handleToggleNotifications(false)}  
        >
          <DrawerNotifications toggleDrawer={ handleToggleNotifications } />
        </Drawer>

        <Typography
          variant="h4"
          textAlign="center"
          component="div"
          sx={{
            color: "primary.main",
            fontFamily: "Lobster",
            fontWeight: "semibold",
          }}
        >
          Hashtagram
        </Typography>

        <Button onClick={() => navigate("/user/camara")}>
          <CameraAltRoundedIcon />
        </Button>
        {/* <ViewCamera /> */}
      </Toolbar>
    </Grid>
  );
};

export default ToolbarCustom;
