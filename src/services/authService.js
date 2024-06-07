const BASE_URL = 'http://localhost:3000/api/auth'
import axios from "axios"

const API_URL = import.meta.env.REACT_APP_BACKEND_URL;

export const login = (data) => {
  console.log("Iniciando sesión en la API mi chamo", BASE_URL)
  console.log("Información de inicio de sesión", data)
}
export const registrar = async (correo, nombre_completo, nombre_usuario,contrasena) => {
  try {
    const response = await axios.post(`http://34.176.83.207:9999/usuario/registrar`, {
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