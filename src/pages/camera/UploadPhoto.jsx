import { Box, Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { NavbarPage } from "../../components/navbar/NavbarPage";

export const UploadPhoto = () => {
  const location = useLocation();

  const photo = location.state.photo;

  return (
    <Grid
      container
      direction="column"
      justifyContent="start"
      sx={{ height: "100dvh", width: "100dvw" }}
    >
      <NavbarPage title={"Subida de publicación"} />
      {/* Foto capturada */}
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Grid
          container
          justifyContent="start"
          alignItems="start"
          sx={{
            border: "1px solid",
            borderColor: "secondary.secondary",
            width: "90dvw",
            height: "50dvh",
          }}
        >
          {
            <Box
              component="img"
              sx={{
                height: "100%",
                width: "100%",
                aspectRatio: "16/9",
                mb: "5rem",
              }}
              alt="Foto capturada"
              src={photo}
            />
          }
        </Grid>
      </Grid>
      <Typography variant="h6" sx={{ mt: "2rem", ml: 4 }}>
        Formulario de subida...
      </Typography>
    </Grid>
  );
};
