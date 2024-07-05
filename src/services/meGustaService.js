import axios from "axios"

const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const registrarMeGusta = async (in_interactuadorId, in_fotoId) => {
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

export const eliminarMeGusta = async (in_interactuadorId, in_fotoId) => {
    try {
      const response = await axios.delete(`${API_URL}/me-gusta/eliminar?interactuadorId=${in_interactuadorId}&fotoId=${in_fotoId}`)
      if ( response.status === 200 ) {
        return {success: true, message: response.data};
      } else {
        return {success: false, status: response.status};
      }
  
    } catch (error) {
      return {success: false, status: error.response.status};
    }
  }

export const saberSiUsuarioDioMeGustaAFoto = async (in_interactuadorId, in_fotoId) => {
    if(in_interactuadorId && in_fotoId){
        try {

            const response = await axios.get(`${API_URL}/me-gusta/saber-si-usuario-dio-like-a-una-foto?interactuadorId=${in_interactuadorId}&fotoId=${in_fotoId}`)
            if ( response.status === 200 ) {
                return {success: true, message: response.data};
            } else {
                return {success: false, status: response.status};
            }
        
            } catch (error) {
            return {success: false, status: error.response.status};
            }
        }
    console.log("no funciona")
    return {success: false, message: "no funciona"};
}

  export const meGustasQueMeHanDado = async (usuarioId) => {
    try {
      const response = await axios.get(`${API_URL}/me-gusta/me-gusta-que-me-han-dado/${usuarioId}`)
      if ( response.status === 200 ) {
        return {success: true, message: response.data};
      } else {
        return {success: false, status: response.status};
      }
  
    } catch (error) {
      return {success: false, status: error.response.status};
    }
  }
export const getMeGustasNoVistos = async (id_usuario) => {
  try {
    
    const response = await axios.get(`${API_URL}/me-gusta/cantidad-de-me-gusta-no-ocultos/${id_usuario}`)

    if ( response.status === 200) {
      return {success: true, data: response.data};
    }

    return { success: false};
  } catch (error) {
    return error;
  }
}
export const ocultarMeGusta = async (id_usuario) => {
  try {
    const response = await axios.patch(`${API_URL}/me-gusta/ocultar-me-gusta/${id_usuario}`);

    if ( response.status === 200) {
      return {success: true, message: response.data};
    }

    return { success: false }
  } catch (error) {
    return error;
  }
}