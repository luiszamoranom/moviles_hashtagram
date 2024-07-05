import { Box, Button, Grid, Link, Skeleton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import { Link as RouterLink } from 'react-router-dom';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  registrarMeGusta,
  eliminarMeGusta,
  saberSiUsuarioDioMeGustaAFoto
} from '../../services/meGustaService'
import useUsuarioCache from '../../hooks/usuario/useUsuarioCache'

const Publicacion = ({datosImagen}) => {
  const [like,setLike] = useState(false)
  const [cantidadLikes,setCantidadLikes] = useState(0)
  const {userCredentials} = useUsuarioCache()

  const handleClick = () => {
    console.log("Presionaste para no ver más")
  }

  const handleCargarSiDioLike = async () => {
    const interactuadorId = userCredentials.usuarioId
    const fotoId = datosImagen.foto.id
    const response = await saberSiUsuarioDioMeGustaAFoto(interactuadorId,fotoId)
    if(response.success){
      setLike(true)
    }else{
      setLike(false)
    }
  }

  useEffect( () => {
    if(datosImagen && userCredentials){
      handleCargarSiDioLike()
    }
  },[userCredentials && datosImagen])

  useEffect( () => {
    setCantidadLikes(datosImagen.foto._count.meGusta)
  },[])

  const handleClickLike = async() => {
    const interactuadorId = userCredentials.usuarioId;
    const fotoId = datosImagen.foto.id
    console.log("interactuadorId: "+interactuadorId)
    console.log("fotoId: "+fotoId)
    if(interactuadorId && fotoId){
      if(like){
        console.log("debería pasar a no me gusta")
        console.log("debería pasar a me gusta")
        const response = await eliminarMeGusta(interactuadorId,fotoId)
        if(response.success){
          setLike(false)
          setCantidadLikes(cantidadLikes-1)
        }else{
          console.log("Error al eliminar me gusta")
        }
        
      }else{
        console.log("debería pasar a me gusta")
        const response = await registrarMeGusta(interactuadorId,fotoId)
        if(response.success){
          setLike(true)
          setCantidadLikes(cantidadLikes+1)
        }else{
          console.log("Error al registrar me gusta")
        }
      }
    }else{
      console.log("interactuador (usuario de la sesión) no definido");
    }
  }

  return (
    <Grid>
      <Grid id='info-usuario' 
      gap={0.2} sx={{minHeight:"5dvh",maxHeight:"5dvh",width:"100%",backgroundColor:"white",display:'flex',paddingX:'0.5rem',paddingY:'0.25rem'}}>
        <Grid sx={{width:'8%',maxWidth:'8%'}} >
          {
            datosImagen.foto.propietario.fotoExtension?
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
                loading='lazy'
                src={`data:image/${datosImagen.foto.propietario.fotoExtension};base64,${datosImagen.foto.propietario.fotoPerfil}`}
              />
            </>
            :
            <>
              <Skeleton animation="wave" variant="circular" width={'2rem'} height={'2rem'} />
            </>
          }
          
        </Grid>
        <Grid sx={{width:'30%',maxWidth:'40%',justifyContent:'start', alignItems: 'center' , display:'flex', paddingLeft:'0.25rem'}} >
          <Typography overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>
            <Link 
            component={RouterLink} to="/user/profile" state={datosImagen.foto.propietario.id}
            sx={{ textDecoration: 'none', color: 'inherit' }}>
              <strong>{datosImagen.foto.propietario.nombreUsuario}</strong>
            </Link>
          </Typography>
        </Grid>
        <Grid sx={{width:'32%',maxWidth:'42%',justifyContent:'start', alignItems: 'center' , display:'flex', paddingLeft:'0.25rem'}} >
          <LocationOnOutlinedIcon  fontSize='medium' />
          <Typography overflow='hidden' variant='caption' textOverflow='ellipsis' whiteSpace='nowrap'>
              {datosImagen.foto.ubicacion}
          </Typography>
        </Grid>
        <Grid sx={{width:'15%',maxWidth:'15%',justifyContent:'center', alignItems: 'center', display:'flex'}} >
          <Button onClick={handleClickLike} sx={{padding:0,margin:0,minWidth:'10%'}}>
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
        <Grid sx={{width:'15%',maxWidth:'15%',justifyContent:'center', alignItems: 'center', display:'flex'}} >
        <Button onClick={handleClick}sx={{padding:0,margin:0,minWidth:'10%'}}>
            <VisibilityOffIcon fontSize='small' color='colorNegro' />
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
          src={datosImagen.foto.base64}
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
            loading='lazy'
            src={datosImagen.foto.base64}
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
        <Grid sx={{display:'flex',justifyContent:'space-between'}}>
          <Typography overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>
            <Link 
            component={RouterLink} to="/user/profile" state={datosImagen.foto.propietario.id}
            sx={{ textDecoration: 'none', color: 'inherit' }}>
              <strong>{datosImagen.foto.propietario.nombreUsuario}</strong>
            </Link>
          </Typography>
          <Typography>
            Les fascina {cantidadLikes}.
          </Typography>
        </Grid>
        <Grid sx={{
          overflowY: 'auto',  
          maxHeight: 'calc(9dvh - 2rem)',  // Ajusta la altura máxima para el desbordamiento
          flexDirection: 'column'  // Asegura que el contenido se apile verticalmente
        }}>
          <Typography sx={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {datosImagen.foto.descripcion}
            {
              datosImagen.foto.hashtags.map((hg) => (
                <a href='#' style={{color:"#914DF0"}} key={hg.hashtag.etiqueta}>{' #' + hg.hashtag.etiqueta}</a>
              ))
            }
            
          </Typography>
        </Grid>
      </Grid>
    </Grid>


    </Grid>
  )
}

export default Publicacion
