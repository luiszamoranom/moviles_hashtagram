import { Grid, Paper } from '@mui/material';
import Publicacion from '../../components/search/Publicacion';
import ToolbarCustom from '../../components/toolbar/Toolbar';
import Navbar from '../../components/navbar/Navbar';
import { useLocation } from 'react-router-dom';

export const Image = () => {
  
  const location = useLocation();

  const { photo } = location.state;

  console.log(photo)

  return (
    <Grid
      container
      direction="column"
      sx={ { minHeight: "100dvh", maxHeight: "100dvh", width: "100vw" } }
    >
      <Grid id='toolbar' item sx={ { minHeight: "6dvh", maxHeight: "6dvh", width: "100vw" } }>
        <ToolbarCustom />
      </Grid>

      <Grid
        // onTouchStart={ handleTouchStart }
        // onTouchEnd={ handleTouchEnd }
        id='publicaciones'
        container
        sx={ { maxWidth: '100vw', whiteSpace: 'nowrap', minHeight: '88vh', } }
      >
        <Grid
          id='grid-publicacion'
          sx={ {
            minWidth: '100%',
            maxWidth: '100%',
            display: 'inline-block',
            verticalAlign: 'top',
            // transform: `translateY(${ positions[ index ] }px)`,
            transition: 'transform 0.3s',
          } }
        >

          <Paper
            id='paper-publicacion'
            sx={ {
              width: '100%',
              overflow: 'hidden',
              scrollSnapAlign: 'center'
            } }
          >
            <Publicacion datosImagen={ photo } />
          </Paper>
        </Grid>
      </Grid>
      <Grid id='navbar' item sx={{ minHeight: "6dvh", maxHeight: "6dvh", width: "100vw" }}>
        <Navbar currentPage={0} />
      </Grid>
    </Grid>
  );
};