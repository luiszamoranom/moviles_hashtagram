import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { obtenerPublicaciones } from '../../services/publicacionService'
import Publicacion from './Publicacion'

const Feed = () => {
  const [fotos,setFotos] = useState([])

  const getPhotos = async () => {
    const response = await obtenerPublicaciones()
    if (response.success){
      setFotos(response.message)
    }
  }

  useEffect(()=>{
    getPhotos()
  },[])

  return (
    <>
     {
        fotos.length > 0?
        <>
          {/* {
            fotos.map((foto)=>(
              <Publicacion />
            ))
          } */}
          <Publicacion datosImagen={fotos[0]} />
        </>
        :
        <>
        <h1>
          No hay fotos 
        </h1>
        </>
      }
    </>
   
  )
}

export default Feed
