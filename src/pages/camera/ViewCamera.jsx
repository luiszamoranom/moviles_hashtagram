import React,{useState} from 'react'
import { Camera, CameraResultType,CameraSource } from '@capacitor/camera';
import { usePhotoGallery } from '../../hooks/usePhotoGallery';
import { Grid } from '@mui/material';


const ViewCamera = () => {
    const [photo,setPhoto] = useState([])
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
          console.error('Error taking photo', error);
        }
      } catch (e) {
          return;
      }
    };
    return (
        <Grid container direction="column"
        minHeight="100dvh" width="100dvw" justifyContent={'center'}
        alignItems="center">
          <button onClick={() => takePicture()}>Take Photo</button>
          {photo && <img src={photo} alt="Taken photo" />}
        </Grid>
    );
}

export default ViewCamera
