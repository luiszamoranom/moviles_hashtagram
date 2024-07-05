import axios from "axios"

const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const getMeGustasNoVistos = async (id_usuario) => {
  try {
    
    const response = await axios.get(`${API_URL}/me-gusta/cantidad-de-me-gusta-no-ocultos/${id_usuario}`)

    if ( response.status === 200) {
      return {success: true, data: response.data};
    }

    return { success: false};
  } catch (error) {
    return { success: false};
  }
}

export const ocultarMeGusta = async (id_me_gusta) => {
  try {
    const response = await axios.patch(`${API_URL}/me-gusta/ocultar-me-gusta/${id_me_gusta}`);
    console.log(response)
    if ( response.status === 200) {
      return {success: true, message: response.data};
    }

    return { success: false }
  } catch (error) {
    return { success: false };
  }
}

export const getMeGustasObtenidos = async (id_usuario) => {
  try {
    const response = await axios.get(`${API_URL}/me-gusta/me-gusta-que-me-han-dado/${id_usuario}`);

    if ( response.status === 200 ) {
      return { success: true, data: response.data };
    }

    return { success: false }
  } catch (error) {
    return { success: false }
  }
};