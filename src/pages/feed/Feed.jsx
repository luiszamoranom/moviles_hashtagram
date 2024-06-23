import {  Grid, Typography, Box, useScrollTrigger , Paper } from '@mui/material'
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
  
  // Función para manejar el desplazamiento hacia la siguiente publicación
  const handleScrollToNextPost = () => {
    // Encontrar la posición de la siguiente publicación visible
    const nextPostIndex = Math.min(scrollIndex + 1, fotos.length - 1);
    // Obtener la posición de la siguiente publicación usando su índice
    const nextPostElement = document.getElementById(`post-${nextPostIndex}`);
    // Desplazar hasta la posición de la siguiente publicación
    nextPostElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Actualizar el índice de desplazamiento
    console.log(nextPostIndex)
    setScrollIndex(nextPostIndex);
  };

  // Estado para mantener el índice de la publicación visible
  const [scrollIndex, setScrollIndex] = useState(0);

  // Hook de Material-UI para manejar el desplazamiento
  useScrollTrigger({
    target: window,
    threshold: 200, // Umbral opcional para personalizar cuándo se activa el trigger
    disableHysteresis: true, // Desactiva el efecto histeresis para un desplazamiento más suave
    // Callback cuando ocurre el evento de desplazamiento
    onScroll: () => {
      handleScrollToNextPost();
    },
  });
  
  return (
    <Grid container sx={{ maxWidth:'100dvw', whiteSpace: 'nowrap', minHeight: '80vh' }}>
      {fotos.length > 0 ? (
        fotos.map((foto, index) => (
          <Grid item key={index} sx={{ minWidth: '100%', maxWidth: '100%', display: 'inline-block', verticalAlign: 'top' }}>
            <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
              <Publicacion datosImagen={foto} id={index} />
            </Paper>
          </Grid>
        ))
      ) : (
        <Grid item>
          <Typography variant="h5">No hay fotos</Typography>
        </Grid>
      )}
    </Grid>
  )
}

export default Feed
