import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CollectionsIcon from "@mui/icons-material/Collections";
import { Box, Button, Grid, Stack } from "@mui/material";
import { useState } from "react";
import { NavbarPage } from "../../components/navbar/NavbarPage";
import { useNavigate } from "react-router-dom";

const ViewCamera = () => {
  const navigate = useNavigate();

  const [photo, setPhoto] = useState(null);

  const convertToBase64 = async (url) => {
    return fetch(url)
      .then(response => response.blob())
      .then(blob => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      });
  };
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
  const pickImage = async () => {
    try {
      const cameraPhoto = await Camera.pickImages({
        resultType: CameraResultType.DataUrl,
        quality: 100,
      });
      
      if (cameraPhoto.photos.length > 0 && cameraPhoto.photos[0]?.webPath) {
        const base64 = await convertToBase64(cameraPhoto.photos[0].webPath);
        setPhoto(base64);
      }
    } catch (error) {
      console.error("Error picking image", error);
    }
  };

  const handleSubirFoto = () => {
    navigate("/user/upload-photo", { state: { photo } });
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      sx={{ height: "100dvh", width: "100dvw" }}
    >
      <NavbarPage title={"Subir foto"} />
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
            alignItems:"center",
            display:'flex',
            justifyContent:'center',
            width: "90dvw",
            height: "50dvh",
          }}
        >
          {
            <Box
              component="img"
              sx={{
                //height: "100%",
                alignItems:"center",
                display:'flex',
                justifyContent:'center',
                width: "100%",
              }}
              alt="Foto capturada"
              src={photo}
            />
          }
        </Grid>
      </Grid>

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
        sx={{
          height: "30dvh",
          width: "80dvw",
          mx: "auto",
          borderTop: "1px solid",
          borderTopColor: "secondary.secondary",
        }}
      >
        {photo && (
          <Stack direction="row" gap={2}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleSubirFoto}
                startIcon={<CameraAltIcon />}
                sx={{
                  textTransform: "none",
                  fontSize: 20,
                }}
              >
                Subir foto
              </Button>
            </Grid>
          </Stack>
        )}
        <Stack direction="row" gap={2}>
          <Grid item xs={8}>
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
          <Grid item xs={4}>
            <Button
              variant="contained"
              onClick={() => pickImage()}
              startIcon={<CollectionsIcon />}
              sx={{
                textTransform: "none",
                fontSize: 20,
              }}
            >
              Galería
            </Button>
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ViewCamera;
