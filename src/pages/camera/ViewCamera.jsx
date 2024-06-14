import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CollectionsIcon from "@mui/icons-material/Collections";
import { Box, Button, Grid } from "@mui/material";
import { useState } from "react";
import { NavbarPage } from "../../components/navbar/NavbarPage";

const ViewCamera = () => {
  const [photo, setPhoto] = useState(null);

  const takePicture = async () => {
    try {
      try {
        const cameraPhoto = await Camera.getPhoto({
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Camera,
          quality: 100,
        });
        if (cameraPhoto?.dataUrl) {
          setPhoto(cameraPhoto.dataUrl);
        }
      } catch (error) {
        console.error("Error taking photo", error);
      }
    } catch (e) {
      return;
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      sx={{ height: "100dvh", width: "100dvw" }}
    >
      <NavbarPage />
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
            width: "80dvw",
            height: "40dvh",
          }}
        >
          {
            <Box
              component="img"
              sx={{
                height: "100%",
                width: "100%",
                mb: "5rem",
              }}
              alt="Foto capturada"
              src={photo}
              // src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
            />
          }
        </Grid>
      </Grid>

      {/* Botones */}
      <Grid container>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            height: "30dvh",
            width: "80dvw",
            mx: "auto",
            borderTop: "1px solid",
            borderTopColor: "secondary.secondary",
          }}
        >
          <Grid container direction="column" gap={4}>
            <Grid
              item
              xs={12}
              sx={{
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={() => takePicture()}
                startIcon={<CameraAltIcon />}
                sx={{
                  textTransform: "none",
                  fontSize: 20,
                }}
              >
                Capturar foto
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={() => takePicture()}
                startIcon={<CollectionsIcon />}
                sx={{
                  textTransform: "none",
                  fontSize: 20,
                }}
              >
                Galería
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ViewCamera;
