import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Box, Button, Grid, Link, Skeleton, Typography } from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Publicacion = ({datosImagen}) => {
  const [like,setLike] = useState(false)
  return (
    <Grid>
      <Grid id='info-usuario' 
      gap={0.2} sx={{minHeight:"5dvh",maxHeight:"5dvh",width:"100%",backgroundColor:"white",display:'flex',paddingX:'0.5rem',paddingY:'0.25rem'}}>
        <Grid sx={{width:'8%',maxWidth:'8%'}} >
          {
            datosImagen.propietario.fotoExtension?
            <>
              <Box
                component="img"
                sx={{
                  borderRadius: "50%",
                  width: "100%",
                  height: "auto",
                  display: 'block',
                  objectFit: 'cover',
                  aspectRatio: '1/1'
                }}
                alt="Foto capturada"
                src={`data:image/${datosImagen.propietario.fotoExtension};base64,${datosImagen.propietario.fotoPerfil}`}
              />
            </>
            :
            <>
              <Skeleton animation="wave" variant="circular" width={'2rem'} height={'2rem'} />
            </>
          }
          
        </Grid>
        <Grid sx={{width:'40%',maxWidth:'40%',justifyContent:'start', alignItems: 'center' , display:'flex', paddingLeft:'0.25rem'}} >
          <Typography overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>
            <Link 
            component={RouterLink} to="/user/profile" state={datosImagen.propietarioId }
            sx={{ textDecoration: 'none', color: 'inherit' }}>
              <strong>{datosImagen.propietario.nombreUsuario}</strong>
            </Link>
          </Typography>
        </Grid>
        <Grid sx={{width:'42%',maxWidth:'42%',justifyContent:'start', alignItems: 'center' , display:'flex', paddingLeft:'0.25rem'}} >
          <LocationOnOutlinedIcon  fontSize='medium' />
          <Typography overflow='hidden' variant='caption' textOverflow='ellipsis' whiteSpace='nowrap'>
              {datosImagen.ubicacion}
          </Typography>
        </Grid>
        <Grid sx={{width:'10%',maxWidth:'10%',justifyContent:'center', alignItems: 'center', display:'flex'}} >
          <Button onClick={()=>setLike(true)} sx={{padding:0,margin:0,minWidth:'10%'}}>
            {
              like?
              <>
                <FavoriteOutlinedIcon fontSize='small' color='error' />
              </>
              :
              <>
                <FavoriteBorderOutlinedIcon color='error' />
              </>
            }
          </Button>
        </Grid>
      </Grid>
      <Grid id='imagen-publicacion' 
        sx={{minHeight:"74vh", maxHeight:"74vh", display:'flex', alignItems:'center',
           justifyContent:'center', position: 'relative',overflow: 'hidden'}}
      >
        <Box
          component="img"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(50px)',
            zIndex: 1,
          }}
          alt="Foto difuminada"
          src={datosImagen.base64}
        />
        <Grid 
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Box
            component="img"
            sx={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
            }}
            alt="Foto capturada"
            src={datosImagen.base64}
          />
        </Grid>
      </Grid>
      <Grid id='detalles-publicacion' 
      sx={{
        minHeight: "9dvh",
        maxHeight: "9dvh",
        width: "100%",
        backgroundColor: "white",
        paddingX: '0.5rem',
        overflow: 'hidden'  // Asegura que el contenedor principal no tenga desbordamiento visible
      }}
    >
      <Grid sx={{ minHeight: '100%' }}>
        <Grid>
          <Typography>
            <Link href='#' sx={{ textDecoration: 'none', color: 'inherit' }}>
              <strong>{datosImagen.propietario.nombreUsuario}</strong>
            </Link>
          </Typography>
        </Grid>
        <Grid sx={{
          overflowY: 'auto',  
          maxHeight: 'calc(9dvh - 2rem)',  // Ajusta la altura máxima para el desbordamiento
          flexDirection: 'column'  // Asegura que el contenido se apile verticalmente
        }}>
          <Typography sx={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {datosImagen.descripcion} 
          </Typography>
        </Grid>
      </Grid>
    </Grid>


    </Grid>
  )
}

export default Publicacion
