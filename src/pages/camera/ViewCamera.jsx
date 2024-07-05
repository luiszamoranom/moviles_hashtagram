import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CollectionsIcon from "@mui/icons-material/Collections";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { NavbarPage } from "../../components/navbar/NavbarPage";
import { useNavigate } from "react-router-dom";
import WallpaperOutlinedIcon from '@mui/icons-material/WallpaperOutlined';
import LayoutWithNavbar from "../LayoutWithNavbar";
import Compressor from 'compressorjs';

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
          quality: 30,
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
        quality: 30,
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
    <Grid>
      {/* esto mide 6vh */}
      <NavbarPage id='navbar-page' title={"Subir foto"} />
      {/* mide 84vh */}
      <Grid 
        id='contenido-page'
        container 
        direction="column" 
        alignItems="center" 
        justifyContent="center" 
        sx={{
          minHeight: "88vh",
          overflowY: "auto"
        }}
      >
        {/* Foto capturada */}
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
          sx={{
            width: "100%",
            mb: 2
          }}
        >
          <Grid
            container
            justifyContent="start"
            alignItems="start"
            sx={{
              boxShadow:10,
              alignItems:"center",
              display:'flex',
              justifyContent:'center',
              width: "95dvw",
              minHeight: "70vh",
              overflow: "hidden"
            }}
          >
            {
              photo?
              <>
                <Box
                  component="img"
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain"
                  }}
                  alt="Foto capturada"
                  src={photo}
                />
              </>
              :
              <Grid sx={{width:'100%'}}>
                <Grid sx={{display:'flex',justifyContent:'center',alignItems:'center'}} >
                  <WallpaperOutlinedIcon fontSize="large" />
                </Grid>
                <Grid sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <Typography>
                    Selecciona o captura una foto
                  </Typography>
                </Grid>
              </Grid> 
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
            minHeight: "15vh",
            width: "95vw",
            mx: "auto",
            mb: 6,
          }}
        >
          {photo && (
            <Stack mb="2rem" direction="row" gap={2}>
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
            <Grid item>
              <Button
                variant="contained"
                onClick={() => takePicture()}
                startIcon={<CameraAltIcon />}
                sx={{
                  textTransform: "none",
                  fontSize: 15,
                }}
              >
                Capturar
              </Button>
            </Grid>
            <Grid item mb="2rem">
              <Button
                variant="contained"
                onClick={() => pickImage()}
                startIcon={<CollectionsIcon />}
                sx={{
                  textTransform: "none",
                  fontSize: 15,
                }}
              >
                Galería
              </Button>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ViewCamera;
