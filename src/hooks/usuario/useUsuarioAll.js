import React, { useState } from 'react'
import { obtenerInfoUsuarioId, obtenerMetadatosUsuario } from '../../services/usuarioService'

const useUsuarioAll = () => {
    const [usuario,setUsuario] = useState()
    const getInfoUsuario = async (id) => {
        const response = await obtenerInfoUsuarioId(id)
        if (response.success){
            setUsuario(response.message)
        }else{
            setUsuario(null)
        }
    }
    const getMetadatosUsuario = async (id) => {
        const response = await obtenerMetadatosUsuario(id)
        return response.message
        console.log(response)
        if (response.success){
            setUsuario(response.message)
        }else{
            setUsuario(null)
        }
        
    }

    return {
        usuario,getInfoUsuario,getMetadatosUsuario
    }
}

export default useUsuarioAll
