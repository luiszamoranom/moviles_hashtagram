import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import { Button, Drawer, Grid, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomNotification from "./Notification";
import { useState } from 'react';
import { DrawerNotifications } from './DrawerNotifications';
import { useFotos } from "../../pages/LayoutWithNavbar";

const ToolbarCustom = () => {

  const navigate = useNavigate();
  const { getPhotos } = useFotos()
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
        <Grid id='notificaciones' sx={{paddingX:'1.25rem',paddingY:'0.1rem',display:'flex',justifyContent:'center'}}>
          <CustomNotification openNotifications={ handleToggleNotifications } />
        </Grid>

        <Drawer
          anchor="top"
          open={openNotifications}
          onClose={() => handleToggleNotifications(false)}  
        >
        <DrawerNotifications toggleDrawer={ handleToggleNotifications } />
        </Drawer>
        <button id='logo' style={{border:'0',backgroundColor:'transparent'}}
        onClick={getPhotos}>
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
        </button>
       

        <Button id='camara' onClick={() => navigate("/user/camara")}>
          <CameraAltRoundedIcon />
        </Button>
        {/* <ViewCamera /> */}
      </Toolbar>
    </Grid>
  );
};

export default ToolbarCustom;
