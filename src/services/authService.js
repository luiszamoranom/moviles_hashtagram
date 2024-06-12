import axios from "axios"

const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const login = async ({username, password}) => {
  try {
    const response = await axios.post(`${API_URL}/identidad/login`, {
      nombre_usuario: username,
      contrasena: password
    })
    console.log(response);
    if ( response.status === 200 ) {
      return {success: true, token: response.data};
    } else {
      return {success: false, status: response.status};
    }

  } catch (error) {
    return {success: false, status: error.response.status};
  }
}

export const registrar = async (correo, nombre_completo, nombre_usuario,contrasena) => {
  try {
    const response = await axios.post(`${API_URL}/usuario/registrar`, {
      nombre_completo,nombre_usuario,email:correo,contrasena});
    console.log(response)
    if (response.status === 201) {
      //console.log("Usuario registrado correctamente.");
      return true;
    }
    else {
      return false;
    }
  } catch (error) {
    //console.error('Error al registrar usuario', error);
    return false;
  }
}