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

export const obtenerPublicaciones = async () => {
  try{
    const response = await axios.get(`${API_URL}/foto`)
    console.log(response)
    if (response){
      return {success:true,message:response.data}
    }
  }catch(error){
    return {success:false,message:'Error al obtener las fotos'}
  }
}