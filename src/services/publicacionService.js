import axios from "axios"

const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

async function comprimirImagen(base64Image, opcionesCompresion = { quality: 0.2 }) {
  return new Promise((resolve, reject) => {
    try {
      // Crea una imagen temporal para Compressor.js
      const img = document.createElement('img');
      img.src = base64Image;

      img.onload = () => {
        new Compressor(img, {
          ...opcionesCompresion, // Pasa las opciones de compresión
          success(result) {
            const reader = new FileReader();
            reader.readAsDataURL(result);
            reader.onloadend = () => {
              resolve(reader.result); // Retorna el Base64 comprimido
            };
          },
          error(err) {
            reject(new Error(`Error al comprimir la imagen: ${err.message}`));
          },
        });
      };

      img.onerror = (err) => {
        reject(new Error(`Error al cargar la imagen: ${err}`));
      };
    } catch (error) {
      reject(new Error(`Error al comprimir la imagen: ${error.message}`));
    }
  });
}

export const subirPublicacion = async (propietario,descripcion,ubicacion,base64,hashtags) => {
  try {
    const base64comprimido = comprimirImagen(base64)
    const response = await axios.post(`${API_URL}/foto/subir`, {
      propietarioId:propietario,descripcion,ubicacion,base64,hashtags
    })
    if ( response.status === 201 ) {
      return {success: true, message: 'Publicación subida'};
    } else {
      return {success: false, message: 'Algo falló'};
    }
  } catch (error) {
    let message = ''
    if (error.response.status === 400){
        message = 'Los campos deben ser válidos'
    }else{
        message = 'Error del servidor'
    }
    return {success: false, message: message};
  }
}

export const obtenerPublicaciones = async (usuarioId) => {
  try{
    const response = await axios.get(`${API_URL}/foto/no-ocultadas/${usuarioId}`)
    if (response){
      return {success:true,message:response.data}
    }
  }catch(error){
    return {success:false,message:'Error al obtener las fotos'}
  }
}

export const obtenerPublicacionesPorHashtag = async (hashtag) => {
  try {
    const response = await axios.get(`${API_URL}/hashtag/obtener-fotos/${hashtag}`);

    return { success: true, data: response.data};
  } catch (error) {
    if ( error.response.status === 404 ) {
      return { success: false, message: "No se encontraron fotos con ese hashtag"}
    }
    return { success: false, message: "Error al obtener las fotos"}
  }
}