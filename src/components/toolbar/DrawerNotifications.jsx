import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Divider, Grid, IconButton, Typography } from "@mui/material";
import { ItemNotification } from "./ItemNotification";
import { Fragment, useCallback, useEffect, useState } from "react";
import {
  getMeGustasObtenidos,
  ocultarMeGusta,
} from "../../services/meGustaService";
import usuarioStore from "../../store/usuarioStore";
import { NotificationSkeleton } from "./NotificationSkeleton";

export const DrawerNotifications = ({ toggleDrawer, handleObtenerCantidadNotificaciones }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [notificaciones, setNotificaciones] = useState([]);

  const getCredentialsUser = async () => {
    const user = await usuarioStore().getUser();
    return user.usuarioId;
  };

  const getNotificaciones = useCallback(async () => {
    const id = await getCredentialsUser();
    const response = await getMeGustasObtenidos(id);

    if (response.success) {
      setNotificaciones(response.data);
    } else {
      setNotificaciones([]);
    }
    handleObtenerCantidadNotificaciones();
    setIsLoading(false);
  }, [handleObtenerCantidadNotificaciones]);

  const handleOcultarNotificacion = async (id) => {
    setIsLoading(true);
    const response = await ocultarMeGusta(id);

    if (response.success) {
      getNotificaciones();
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getNotificaciones();
  }, [getNotificaciones]);

  return (
    <Box
      sx={{ width: "auto", height: "100vh", background: "white" }}
      role="presentation"
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        minHeight="6vh"
        alignItems="center"
      >
        <IconButton sx={{ pl: 3 }} onClick={() => toggleDrawer(false)}>
          <ArrowBackIcon fontSize="medium" color="colorNegro" />
        </IconButton>
        <Typography
          variant="h6"
          color="black"
          fontSize="25px"
          component="div"
          textAlign="center"
          sx={{
            flexGrow: 1,
            fontFamily: "Lobster",
            letterSpacing: "1px",
            mr: 5,
            py: 2,
          }}
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
        {!isLoading &&
          notificaciones.map((notificacion, index) => (
            <Fragment key={index}>
              <Grid
                container
                direction="row"
                px="1rem"
                gap={2}
                alignItems="center"
              >
                <ItemNotification
                  id={notificacion.id}
                  handleOcultarNotificacion={handleOcultarNotificacion}
                  username={notificacion.interactuador.nombreUsuario}
                  photo={notificacion.foto.base64}
                />
              </Grid>
              {/* Divider */}
              <Divider variant="middle" />
            </Fragment>
          ))}
        {isLoading &&
          Array.from({ length: 8 }, (_, index) => (
            <NotificationSkeleton key={index} />
          ))
        }
        { !isLoading && notificaciones.length === 0 && (
          <Typography
            variant="body1"
            fontSize="1.3rem"
            component="p"
            textAlign="center"
          >
            No tienes nuevas notificaciones
          </Typography>
        ) }
      </Grid>
    </Box>
  );
};
