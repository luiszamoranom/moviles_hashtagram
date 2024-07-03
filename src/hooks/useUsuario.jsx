import React, { useState } from 'react'
import { obtenerInfoUsuarioId } from '../services/usuarioService'

const useUsuario = () => {
    const [usuario,setUsuario] = useState()
    const getInfoUsuario = async (id) => {
        const response = await obtenerInfoUsuarioId(id)
        if (response.success){
            setUsuario(response.message)
        }else{
            setUsuario(null)
        }
    }

    return {
        usuario,getInfoUsuario
    }
}

export default useUsuario
