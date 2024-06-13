import React from 'react'
import { Camera, CameraResultType } from '@capacitor/camera';
import { usePhotoGallery } from '../../hooks/usePhotoGallery';


const ViewCamera = () => {
    const {takePicture,photo} = usePhotoGallery()
    return (
        <div>
          <button onClick={() => takePicture}>Take Photo</button>
          {photo && <img src={photo} alt="Taken photo" />}
        </div>
    );
}

export default ViewCamera
