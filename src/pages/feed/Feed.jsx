import { Grid, Paper } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Publicacion from './Publicacion';
import PublicacionSkeleton from './PublicacionSkeleton';
import { NavbarPage } from '../../components/navbar/NavbarPage';
import ToolbarCustom from '../../components/toolbar/Toolbar';

const Feed = () => {
  const { fotos } = useOutletContext();
  const [positions, setPositions] = useState(new Array(fotos.length).fill(0));

  const [touchStartCoords, setTouchStartCoords] = useState(null);
  const [touchEndCoords, setTouchEndCoords] = useState(null);

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    setTouchStartCoords({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (event) => {
    const touch = event.changedTouches[0];
    setTouchEndCoords({ x: touch.clientX, y: touch.clientY });
  };

  return (
    <Grid>
      <Grid id='toolbar' item sx={{ minHeight: "6dvh", maxHeight: "6dvh", width: "100vw" }}>
        <ToolbarCustom />
      </Grid>
      <Grid
        id='contenido'
        item
        sx={{
          minHeight: "88vh", 
          maxHeight: "88vh",
          overflowY: "scroll",
          alignItems: "center",
          justifyContent: "center",
          scrollSnapType: 'y mandatory'
        }}
      >
        <Grid
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          id='publicaciones'
          container
          sx={{ maxWidth: '100vw', whiteSpace: 'nowrap', minHeight: '88vh' }}
        >
          {fotos.length > 0 ? (
            fotos.map((foto, index) => (
              <Grid
                id={`grid-publicacion-${index}`}
                key={index}
                sx={{
                  minWidth: '100%',
                  maxWidth: '100%',
                  display: 'inline-block',
                  verticalAlign: 'top',
                  transform: `translateY(${positions[index]}px)`,
                  transition: 'transform 0.3s',
                }}
              >
                <Paper
                  id={`paper-publicacion-${index}`}
                  sx={{ width: '100%', overflow: 'hidden', scrollSnapAlign: 'center' }}
                >
                  <Publicacion datosImagen={foto} id={index} />
                </Paper>
              </Grid>
            ))
          ) : (
            <Grid item sx={{ minWidth: '100%', maxWidth: '100%' }}>
              <Paper sx={{ width: '100%', overflow: 'hidden', scrollSnapAlign: 'center' }}>
                <PublicacionSkeleton />
              </Paper>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Feed;
