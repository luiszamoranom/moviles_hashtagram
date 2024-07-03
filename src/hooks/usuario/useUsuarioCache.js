import React, { useEffect, useState } from 'react'
import usuarioStore from '../../store/usuarioStore'

const useUsuarioCache = () => {
    const [userCredentials,setUserCredentials] = useState({
        accessToken:'',
        nombreUsuario:'',
        nombreCompleto:'',
        usuarioId:''
    })
    const {getUser} = usuarioStore()
    const obtenerUsuario = async () => {
      const resultado = await getUser()
      setUserCredentials(resultado)
    }
    useEffect(()=>{
      obtenerUsuario()
    },[])
    return {
        userCredentials
    }
}

export default useUsuarioCache
