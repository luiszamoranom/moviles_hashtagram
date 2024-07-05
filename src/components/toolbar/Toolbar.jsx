import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import React, { useEffect, useState, useContext, useCallback } from 'react'
import { Button, Drawer, Grid, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomNotification from "./Notification";
import useUsuarioCache from '../../hooks/usuario/useUsuarioCache'
import {
  getMeGustasNoVistos,
  meGustasQueMeHanDado
} from '../../services/meGustaService'
import { NavbarProvider, useNavbar } from "../../context/Navbar";
import { DrawerNotifications } from './DrawerNotifications';
import { useFotos } from "../../pages/LayoutWithNavbar";
import usuarioStore from '../../store/usuarioStore';

const ToolbarCustom = () => {

  const navigate = useNavigate();
  const { getPhotos } = useFotos()
  const [openNotifications, setOpenNotifications] = useState(false);
  const [cantidadNotificaciones,setcantidadNotificaciones] = useState(0)
  
  const [ cantidadMeGustas, setCantidadMeGustas ] = useState(0);
  const {userCredentials} = useUsuarioCache()
  const {ws} = useNavbar()

  const handleCargarNotificaciones = async () => {
    if(userCredentials.usuarioId){
      const usuarioId = userCredentials.usuarioId
      const response = await meGustasQueMeHanDado(usuarioId)
    if(response.success){
      setcantidadNotificaciones(response.message.cantidadMeGusta)

    }
    }
  }

  const getCredentialsUser = async () => {
    const user = await usuarioStore().getUser();
    return user.usuarioId;
  };

  const getCantidadNotificaciones = useCallback(async () => {
    const id = await getCredentialsUser();
    const response = await getMeGustasNoVistos(id);

    if ( response.success ) {
      setCantidadMeGustas(response.data.cantidadMeGusta);
    }
  }, []);

  useEffect(() => {
    getCantidadNotificaciones();
  }, [getCantidadNotificaciones])

  useEffect(() => {
    if(userCredentials?.usuarioId){
      handleCargarNotificaciones()
    }
  }, [userCredentials]);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        const mensajeRecibido = parseInt(event.data)
        if(mensajeRecibido == userCredentials.usuarioId){
          console.log("mensaje para mi")
          handleCargarNotificaciones()
        }else{
          console.log("mensaje que no es para mi")
        }
      };

      return () => {
        ws.onmessage = null;
      };
    }
  }, [ws]);

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
          <CustomNotification cantidad={cantidadMeGustas} openNotifications={ handleToggleNotifications } />
        </Grid>

        <Drawer
          anchor="top"
          open={openNotifications}
          onClose={() => handleToggleNotifications(false)}  
        >
        <DrawerNotifications handleObtenerCantidadNotificaciones={getCantidadNotificaciones} toggleDrawer={ handleToggleNotifications } />
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
