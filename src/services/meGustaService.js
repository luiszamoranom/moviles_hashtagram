import axios from "axios"

const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const registrarMeGusta = async ({in_interactuadorId, in_fotoId}) => {
  try {
    const response = await axios.post(`${API_URL}/me-gusta/registrar`, {
      interactuadorId: in_interactuadorId,
      fotoId: in_fotoId
    })
    if ( response.status === 200 ) {
      return {success: true, message: response.data};
    } else {
      return {success: false, status: response.status};
    }

  } catch (error) {
    return {success: false, status: error.response.status};
  }
}

export const eliminarMeGusta = async ({in_interactuadorId, in_fotoId}) => {
    try {
      const response = await axios.delete(`${API_URL}/me-gusta/eliminar`, {
        interactuadorId: in_interactuadorId,
        fotoId: in_fotoId
      })
      if ( response.status === 200 ) {
        return {success: true, message: response.data};
      } else {
        return {success: false, status: response.status};
      }
  
    } catch (error) {
      return {success: false, status: error.response.status};
    }
  }