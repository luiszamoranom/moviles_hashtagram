import axios from "axios";

// const API_URL = import.meta.env.VITE_API_ENDPOINT;
const API_URL = 'http://localhost:9999'

const AuthService = {
  registrar: async (correo: string, nombre_completo: string, nombre_usuario: string,contrasena: string) => {
    try {
      const response = await axios.post(`/registro`, { correo, nombre_completo,nombre_usuario,contrasena});
      if (response.status === 200) {
        console.log("Usuario registrado correctamente.");
        return true;
      }
      else {
        return false;
      }
    } catch (error) {
      console.error('Error al registrar usuario', error);
      return false;
    }
  }

};

export default AuthService;