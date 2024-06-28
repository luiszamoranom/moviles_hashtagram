import axios from "axios"

const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const obtenerInfoUsuarioId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/usuario/informacion-con-fotos/${id}`)
    if ( response.status === 200 ) {
      return {success: true, message: response.data};
    } else {
      return {success: false, message: 'Algo falló'};
    }
  } catch (error) {
    let message = ''
    if (error.response.status === 404){
        message = 'No se encontró el usuario'
    }else{
        message = 'Error del servidor'
    }
    return {success: false, message: message};
  }
}
