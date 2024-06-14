import React, { useEffect, useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { usePhotoGallery } from "../../hooks/usePhotoGallery";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import { Box, Button, Grid } from "@mui/material";
import { NavbarPage } from "../../components/navbar/NavbarPage";

const ViewCamera = () => {
  const [photo, setPhoto] = useState([]);

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
      sx={{ minHeight: "100dvh", maxHeight: "100dvh", width: "100dvw" }}
    >
      <NavbarPage />
      <Grid
        item
        sx={{
          flex: 1,
          overflowY: "auto",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ flex: 1, width: "100dvw", alignItems: "center" }}>
          {photo && (
            <img src={photo} style={{ width: "100dvw" }} alt="Taken photo" />
          )}
        </Box>
      </Grid>
      <Grid
        item
        sx={{
          minHeight: "30dvh",
          maxHeight: "30dvh",
          width: "100vw",
          backgroundColor: "#000AFF",
        }}
      >
        <Grid height={"100%"}>
          <Button onClick={() => takePicture()}>ABRE CAMARA</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ViewCamera;
