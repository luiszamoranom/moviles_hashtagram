import axios from "axios"

const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const subirPublicacion = async (propietario,descripcion,ubicacion,base64,hashtags) => {
  try {
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