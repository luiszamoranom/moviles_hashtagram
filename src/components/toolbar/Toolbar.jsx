import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import React, { useEffect, useState, useContext } from 'react'
import { Button, Grid, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomNotification from "./Notification";
import useUsuarioCache from '../../hooks/usuario/useUsuarioCache'
import {
  meGustasQueMeHanDado
} from '../../services/meGustaService'
import { NavbarProvider, useNavbar } from "../../context/Navbar";

const ToolbarCustom = () => {
  const navigate = useNavigate();
  const [cantidadNotificaciones,setcantidadNotificaciones] = useState(0)
  const {userCredentials} = useUsuarioCache()
  const {ws} = useNavbar()

  const handleCargarNotificaciones = async () => {
    if(userCredentials.usuarioId){
      const usuarioId = userCredentials.usuarioId
      const response = await meGustasQueMeHanDado(usuarioId)
    if(response.success){
      setcantidadNotificaciones(response.data.cantidadMeGusta)
    }
    }
  }

  useEffect(() => {
    if(userCredentials.usuarioId){
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
        <CustomNotification />
        {cantidadNotificaciones}

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
