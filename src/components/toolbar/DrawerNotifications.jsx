import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Divider, Grid, IconButton, Typography } from '@mui/material';
import { ItemNotification } from './ItemNotification';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { getMeGustasObtenidos } from '../../services/meGustaService';
import usuarioStore from '../../store/usuarioStore';

export const DrawerNotifications = ( { toggleDrawer } ) => {

  const [notificaciones, setNotificaciones] = useState([]);

  const getCredentialsUser = async () => {
    const user = await usuarioStore().getUser();
    return user.usuarioId;
  };

  const getNotificaciones = useCallback(async () => {
    const id = await getCredentialsUser();
    const response = await getMeGustasObtenidos(id);

    if ( response.success) {
      console.log(response.data)
      setNotificaciones(response.data);
    }
  }, []);

  useEffect(() => {
    getNotificaciones();
  }, [getNotificaciones]);

  return (
    <Box
      sx={{ width: 'auto', height: '100vh', background: 'white'}}
      role="presentation"
    >
      <Grid container direction="row" justifyContent="center" minHeight="6vh" alignItems="center">
        <IconButton sx={{ pl: 3 }} onClick={ () => toggleDrawer(false) } >
          <ArrowBackIcon fontSize="medium" color="colorNegro" />
        </IconButton>
        <Typography
            variant="h6"
            color="black"
            fontSize="25px"
            component="div"
            textAlign="center"
            sx={{ flexGrow: 1, fontFamily: "Lobster", letterSpacing: "1px", mr: 5, py: 2 }}
          >
            Notificaciones
          </Typography>
      </Grid>
      <Grid 
        container 
        direction="column" 
        gap={4} 
        py="2rem" 
        justifyContent="center"
      >
        {notificaciones.map((notificacion, index) => (
          <Fragment key={index}> 
            <Grid 
              container 
              direction="row" 
              px="1rem" 
              gap={2}
              alignItems="center"
            >
              <ItemNotification
                username={notificacion.interactuador.nombreUsuario} 
                photo={notificacion.foto.base64}   
              />
                
            </Grid>
            {/* Divider */}
            <Divider variant="middle" />
          </Fragment>
        ))}
      </Grid>
      
    </Box>
  )
}