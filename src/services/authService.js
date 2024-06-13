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
    if (response.status === 201) {
      return {success:true,message:"Usuario registrado correctamente"};
    }
    else {
      return false;
    }
  } catch (error) {
    let message=''
    if (error.response.status==409){
      message="Ya existe un usuario con ese nickname o email"
    }else if(error.response.status==400){
      message="Error en el formulario"
    }else{
      message="Error del servidor"
    }
    return {success:false,message:message};
  }
}