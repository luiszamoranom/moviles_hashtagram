import { Camera, CameraResultType,CameraSource } from '@capacitor/camera';
import React, { useState } from 'react';

export const usePhotoGallery = () => {
    const [photos,setPhotos] = useState([])

    const takePicture = async () => {
        try {
            const cameraPhoto = await Camera.getPhoto({
                resultType: CameraResultType.DataUrl,
                source: CameraSource.Camera,
                quality: 100,
              });

            const fileName = new Date().getTime() + '.jpeg';
            const savedFileImage = await savePhoto(cameraPhoto, fileName);
            if (cameraPhoto?.dataUrl) {
                const newPhotos = [...photos, savedFileImage];
                setPhotos(newPhotos);
            }
        } catch (e) {
            return;
        }
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

