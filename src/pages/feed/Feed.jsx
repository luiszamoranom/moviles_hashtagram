import {
  Grid,
  Typography,
  Box,
  useScrollTrigger,
  Paper,
  Slide,
} from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { obtenerPublicaciones } from '../../services/publicacionService';
import Publicacion from './Publicacion';
import useCustomProgress from '../../hooks/useCustomProgress';
import CustomizeProgress from '../../components/CustomizeProgress';
import PublicacionSkeleton from './PublicacionSkeleton';

const Feed = () => {
  const [fotos, setFotos] = useState([]);
  const [scrollIndex, setScrollIndex] = useState(0);
  const gridRef = useRef(null);
  const [positions, setPositions] = useState([]);

  const getPhotos = async () => {
    const response = await obtenerPublicaciones();
    if (response.success) {
      setFotos(response.message);
      setPositions(new Array(response.message.length).fill(0))
    }
  };

  useEffect(() => {
    getPhotos();
  }, []);

  const [touchStartCoords, setTouchStartCoords] = useState(null);
  const [touchEndCoords, setTouchEndCoords] = useState(null);

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    //console.log("empieza: ",touch.clientX,",",touch.clientY)
    setTouchStartCoords({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (event) => {
    const touch = event.changedTouches[0];
    //console.log("termina: ",touch.clientX,",",touch.clientY)
    setTouchEndCoords({ x: touch.clientX, y: touch.clientY });
    // if (touchStartCoords && touchEndCoords) {
    //   const deltaY = touchStartCoords.y - touchEndCoords.y;
    //   if (deltaY > 100) {
    //     console.log("Se mueve hacia arriba la imagen 100");
    //     setPositions((prevPositions) =>
    //       prevPositions.map((pos, index) =>
    //         index === scrollIndex ? pos - 400 : pos
    //       )
    //     );
    //   } else if (deltaY < -100) {
    //     console.log("Se mueve hacia abajo la imagen 100");
    //     setPositions((prevPositions) =>
    //       prevPositions.map((pos, index) =>
    //         index === scrollIndex ? pos + 400 : pos
    //       )
    //     );
    //   }
    // }
  };
  
  return (
    <Grid 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      id='publicaciones' 
      container 
      sx={{ maxWidth: '100vw', whiteSpace: 'nowrap', minHeight: '88vh',  }}
    >
      {fotos.length > 0 ? 
        <>
          {fotos.map((foto, index) => (
            <Grid id={`grid-publicacion-${index}`} key={index} 
              sx={{ 
                minWidth: '100%', 
                maxWidth: '100%', 
                display: 'inline-block',
                verticalAlign: 'top', 
                transform: `translateY(${positions[index]}px)`,
                transition: 'transform 0.3s', 
                // overflowY: 'scroll', 
              }}
            >
              
              <Paper id={`paper-publicacion-${index}`} sx={{ width: '100%', overflow: 'hidden', scrollSnapAlign: 'center' }}>
                <Publicacion datosImagen={foto} id={index} />
              </Paper>
            </Grid>
            ))
          }
        </>
        : (
        <Grid item sx={{minWidth: '100%', maxWidth: '100%',}}>
          <Paper sx={{ width: '100%', overflow: 'hidden', scrollSnapAlign: 'center' }}>
            <PublicacionSkeleton />
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};

export default Feed;
