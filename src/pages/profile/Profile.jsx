import React, { useEffect, useState } from 'react'
import LayoutWithNavbar from '../LayoutWithNavbar'
import { useLocation } from 'react-router-dom'
import useUsuario from '../../hooks/useUsuario'
import { NavbarPage } from '../../components/navbar/NavbarPage'
import { Box, Grid, Skeleton, Typography } from '@mui/material'
import {GridImages} from '../../components/search/GridImages'
import GridImagenPerfil from '../../components/profile/GridImagenPerfil'

const Profile = () => {
    const location = useLocation()
    const propietario = location.state
    const [loading,setLoading] = useState(true)
    const {usuario,getInfoUsuario} = useUsuario()
    useEffect(()=>{
        getInfoUsuario(propietario)
        setLoading(false)
    },[])

    return (
        <LayoutWithNavbar>
            <NavbarPage id="navbar-page" title={"Perfil"} />
            <Grid
                id="contenido-page"
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: "88vh", maxHeight: "88vh", overflowY: "auto" }}
            >
                <Grid id="info-usuario" sx={{ minHeight: "14vh", maxHeight: "14vh", width: "100%", display: 'flex',paddingX:'1rem'}}>
                <Grid sx={{ minWidth: '35%', maxWidth: '35%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {usuario?.fotoExtension ?
                    <Box
                        component="img"
                        sx={{
                        borderRadius: "50%",
                        width: "90%",
                        height: "auto",
                        display: 'block',
                        objectFit: 'cover',
                        aspectRatio: '1/1'
                        }}
                        alt="Foto capturada"
                        src={`data:image/${usuario.fotoExtension};base64,${usuario.fotoPerfil}`}
                    /> :
                    <Skeleton animation="wave" variant="circular" width={'100%'} height={'100%'} />
                    }
                </Grid>
                <Grid sx={{ minWidth: '65%', maxWidth: '65%', paddingY:'1rem' }}>
                    <Grid>
                        <Typography variant='h6'>
                            {usuario ? <strong>{usuario?.nombreCompleto}</strong> : <Skeleton variant="text" width={'40%'} sx={{ fontSize: '1rem' }} />}
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography>
                            {usuario ? usuario?.nombreUsuario : <Skeleton variant="text" width={'40%'} sx={{ fontSize: '1rem' }} />}
                        </Typography>
                    </Grid>
                </Grid>
                </Grid>
                <Grid id="fotos" sx={{ minHeight: "74vh", maxHeight: "74vh", width: "100%", display: 'flex', padding: '1rem', overflowY: 'auto' }}>
                    {usuario ?
                        <GridImagenPerfil loading={loading} photos={usuario?.fotos} /> :
                        <Skeleton variant="rounded" width='100%' height='70vh' />
                    }
                </Grid>
            </Grid>
        </LayoutWithNavbar>
    )
}

export default Profile
