import React, { useEffect } from 'react'
import LayoutWithNavbar from '../LayoutWithNavbar'
import { useLocation } from 'react-router-dom'
import useUsuario from '../../hooks/useUsuario'
import { NavbarPage } from '../../components/navbar/NavbarPage'
import { Box, Grid, Typography } from '@mui/material'

const Profile = () => {
    const location = useLocation()
    const propietario = location.state
    const {usuario,getInfoUsuario} = useUsuario()
    useEffect(()=>{
        getInfoUsuario(propietario);
    },[])
    console.log(usuario)


    return (
        <LayoutWithNavbar>
            {/* esto mide 6vh */}
            <NavbarPage id='navbar-page' title={"Perfil"} />
            {/* mide 84vh */}
            <Grid id='contenido-page'
                container direction="column" alignItems="center" justifyContent="center" sx={{minHeight: "88vh", maxHeight: "88vh"}}
            >
                <Grid id='info-usuario' gap={3} sx={{minHeight:"24vh",maxHeight:"35vh",width:"100%",display:'flex',paddingX:'1rem'}}>
                    <Grid sx={{minWidth:'35%',maxWidth:'35%'}}>
                        {
                            usuario.fotoExtension?
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
                                    src={`data:image/${usuario.fotoExtension};base64,${usuario.fotoPerfil}`}
                                />
                            </>
                            :
                            <>
                                <Skeleton animation="wave" variant="circular" width={'100%'} height={'100%'} />
                            </>
                        }
                       
                    </Grid>
                    <Grid sx={{minWidth:'65%',maxWidth:'65%'}}>
                        <Grid>
                            <Typography>
                                {usuario.nombreCompleto}
                            </Typography>
                        </Grid>
                        <Grid>
                            <Typography>
                                {usuario.nombreUsuario}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid id='fotos' sx={{minHeight:"60vh",maxHeight:"60vh",width:"100%",display:'flex'}}>

                </Grid>
            </Grid>
        </LayoutWithNavbar>
    )
}

export default Profile
