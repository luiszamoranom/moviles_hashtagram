import ClearIcon from '@mui/icons-material/Clear';
import {
  Box,
  IconButton,
  Typography
} from "@mui/material";

import ImagenFlaitiano from '../../assets/huevitorey.jpg';

export const ItemNotification = ({photo = ImagenFlaitiano, textNotification, username = "flaitiano"}) => {
  return (
    <>
      {/* Imagen */}
      <Box
        component="img"
        sx={{
          maxWidth: "2.5rem",
          maxHeight: "2.5rem",
          objectFit: "contain"
        }}
        alt={username}
        src={photo}
      />

      {/* Texto de quién le dió like a tal imagen */}
      <Typography
        variant="body1"
        component="p"
        textAlign="left"
        fontSize="1rem"
        maxWidth="70%"
      >
        <strong>Huevito rey </strong>
        le ha dado like a tu publicación
      </Typography>

      {/* Botón para eliminar notificación */}
      <IconButton>
        <ClearIcon color="colorNegro" />
      </IconButton>

      
    </>
  );
};
