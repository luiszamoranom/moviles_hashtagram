import { Camera, CameraResultType } from '@capacitor/camera';
import React, { useState } from 'react';

export const usePhotoGallery = () => {
    const [photos,setPhotos] = useState([])

    const takePicture = async () => {
        try {
            const photo = await Camera.getPhoto({
                resultType: CameraResultType.Uri,
                source: CameraSource.Camera,
                quality: 100
            });
    
            const fileName = new Date().getTime() + '.jpeg';
            const savedFileImage = await savePhoto(photo, fileName);
    
            const newPhotos = [...photos, savedFileImage];
            setPhotos(newPhotos);
        } catch (e) {
            return;
        }
        
      
        // image.webPath will contain a path that can be set as an image src.
        // You can access the original file using image.path, which can be
        // passed to the Filesystem API to read the raw data of the image,
        // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
        // var imageUrl = image.webPath;
      
        // // Can be set to the src of an image now
        // imageElement.src = imageUrl;
    };

    const savePhoto = async (photo, fileName) => {
        let base64Data;
    
        if (isPlatform('hybrid')) {
            const file = await Filesystem.readFile({
                path: photo.path
            });
            base64Data = file.data;
        } else {
            base64Data = await base64FromPath(photo.webPath);
        }
    
        const savedFile = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Data
        });
    
        if (isPlatform('hybrid')) {
            return {
                filePath: savedFile.uri,
                webviewPath: Capacitor.convertFileSrc(savedFile.uri)
            };
        }
    
        return {
            filePath: fileName,
            webviewPath: photo.webPath
        };
    };
    
    async function base64FromPath(path){
        const response = await fetch(path);
        const blob = await response.blob();
    
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    resolve(reader.result);
                } else {
                    reject('method did not return a string');
                }
            };
    
            reader.readAsDataURL(blob);
        });
    }

    const deletePhoto = async (fileName) => {
        setPhotos(photos.filter((photo) => photo.filePath !== fileName));
        await Filesystem.deleteFile({
            path: fileName,
            directory: Directory.Data
        });
    };

    return{
        photos,takePicture,deletePhoto
    }
}

