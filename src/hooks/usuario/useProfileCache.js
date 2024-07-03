import React, { useEffect, useState } from 'react'
import profileStore from '../../store/profileStore'
import { obtenerInfoUsuarioId } from '../../services/usuarioService'

const useProfileCache = () => {
    const [userProfile,setUserProfile] = useState({
        email: "",
        fotoExtension: "",
        fotoPerfil: "",
        fotos: [],
        habilitado: true,
        id:'',
        nombreCompleto: "",
        nombreUsuario: "",
        rol: ""
    })
    const {getProfile,setProfile} = profileStore()
    const obtenerPerfil = async (id) => {
      const resultado = await getProfile(id)
      if (!resultado){
        const response = await obtenerInfoUsuarioId(id)
        setUserProfile(response.message)
        setProfile(id,response.message)
        console.log("se crea usuario profile:",response.message)
      }
      setUserProfile(resultado)
    }
    return {
        userProfile,obtenerPerfil
    }
}

export default useProfileCache
