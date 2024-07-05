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
export const obtenerMetadatosUsuario = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/usuario/${id}`)
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
export const actualizarMetadatosUsuario = async (id,nombreCompleto,nombreUsuario,descripcion,fotoPerfil,fotoExtension,habilitado) => {
  try {
    console.log(fotoPerfil)
    const response = await axios.put(`${API_URL}/usuario/${id}`,{
      nombreCompleto,nombreUsuario,descripcion,fotoPerfil,fotoExtension,habilitado
    })
    if ( response.status === 200 ) {
      return {success: true, message: 'Exitoso'};
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