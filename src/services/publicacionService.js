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