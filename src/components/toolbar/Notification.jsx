import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { Badge } from "@mui/material";
import { useEffect, useState } from 'react';
import { getMeGustasNoVistos } from '../../services/meGustaService';
import usuarioStore from '../../store/usuarioStore';

const CustomNotification = ({ openNotifications }) => {

  const [ cantidadNotificaciones, setCantidadNotificaciones ] = useState(0);

  const getCredentialsUser = async () => {
    const user = await usuarioStore().getUser();
    return user.usuarioId;
  };

  useEffect(() => {
    const getCantidadNotificaciones = async () => {
      const id = await getCredentialsUser();
      const response = await getMeGustasNoVistos(id);
  
      if ( response.success ) {
        setCantidadNotificaciones(response.data.cantidadMeGusta);
      }
    };

    getCantidadNotificaciones();
  }, [])

  return (
    <Badge badgeContent={cantidadNotificaciones} color="primary" >
      <NotificationsRoundedIcon 
        color="primary" 
        fontSize="medium"
        onClick={() => openNotifications(true)}
      />
    </Badge>
  );
};

export default CustomNotification;
