import React, { useEffect, useState } from 'react'
import LayoutWithNavbar from '../LayoutWithNavbar'
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CollectionsIcon from "@mui/icons-material/Collections";
import { useForm } from 'react-hook-form'
import useAlert from '../../hooks/useAlert'
import useUsuarioAll from '../../hooks/usuario/useUsuarioAll'
import { NavbarPage } from '../../components/navbar/NavbarPage'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { actualizarMetadatosUsuario } from '../../services/usuarioService';
import CustomizeProgress from '../../components/CustomizeProgress';
import useCustomProgress from '../../hooks/useCustomProgress';
import useUsuarioCache from '../../hooks/usuario/useUsuarioCache';
import usuarioStore from '../../store/usuarioStore';
import CustomizeAlert from '../../components/shared/Alert';

const EditProfile = () => {
    const location = useLocation()
    const [usuario,setUsuario] = useState()
    const [imagePreview, setImagePreview] = useState('');
    const {setUser} = usuarioStore()
    const {userCredentials} = useUsuarioCache()
    const {loading,setLoading,handleClose} = useCustomProgress()
    const {getMetadatosUsuario} = useUsuarioAll()
    const {handleCloseAlert,isOpenAlert,msgAlert,severityAlert,
        setIsOpenAlert,setMsgAlert,setSeverityAlert} = useAlert()

    const obtenerUsuario = async () => {
        const resp = await getMetadatosUsuario(location.state)
        setUsuario(resp)
        setImagePreview(`data:image/${resp.fotoExtension};base64,${resp.fotoPerfil}`);
    }

    const form = useForm({
        defaultValues: {
            nombreCompleto: usuario?.nombreCompleto,
            nombreUsuario: usuario?.nombreUsuario,
            descripcion: usuario?.descripcion,
            fotoPerfil: usuario?.fotoPerfil,
            fotoExtension: usuario?.fotoExtension,
            habilitado: usuario?.habilitado,
        },
    });
    const { register, handleSubmit, formState,watch,reset} = form;
    const { errors } = formState;


    useEffect(()=>{
        obtenerUsuario()
    },[])

    useEffect(() => {
        if (usuario) {
          reset({
            nombreCompleto: usuario.nombreCompleto,
            nombreUsuario: usuario.nombreUsuario,
            descripcion: usuario.descripcion? usuario.descripcion:'',
            fotoPerfil: usuario.fotoPerfil,
            fotoExtension: usuario.fotoExtension,
            habilitado: usuario.habilitado,
          });
        }
    }, [usuario, reset]);
    
    
    // Observa los cambios en los campos de imagen
    const watchedFotoPerfil = watch('fotoPerfil');
    const watchedFotoExtension = watch('fotoExtension');

    useEffect(() => {
        if (watchedFotoPerfil && watchedFotoExtension) {
        setImagePreview(`data:image/${watchedFotoExtension};base64,${watchedFotoPerfil}`);
        }
    }, [watchedFotoPerfil, watchedFotoExtension]);

    const convertToBase64 = async (url) => {
        return fetch(url)
          .then(response => response.blob())
          .then(blob => {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                resolve(reader.result);
              };
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            });
          });
    };
    const takePicture = async () => {
        try {
          try {
            const cameraPhoto = await Camera.getPhoto({
              resultType: CameraResultType.DataUrl,
              source: CameraSource.Camera,
              quality: 30,
            });
            if (cameraPhoto?.dataUrl) {
                setImagePreview(cameraPhoto.dataUrl);
            }
          } catch (error) {
            console.error("Error taking photo", error);
          }
        } catch (e) {
          return;
        }
    };
    const pickImage = async () => {
        try {
          const cameraPhoto = await Camera.pickImages({
            resultType: CameraResultType.DataUrl,
            quality: 100,
          });
          
          if (cameraPhoto.photos.length > 0 && cameraPhoto.photos[0]?.webPath) {
            const base64 = await convertToBase64(cameraPhoto.photos[0].webPath);
            setImagePreview(base64);
          }
        } catch (error) {
          console.error("Error picking image", error);
        }
    };

    const onSubmit = async (data) => {
        setLoading(true)
        const response = await actualizarMetadatosUsuario(usuario.id,watch('nombreCompleto'),watch('nombreUsuario'),
            watch('descripcion'),watch('fotoPerfil'),watch('fotoExtension'),watch('habilitado'))
        setLoading(false)
        if (response.success){
          setMsgAlert(response.message)
          setSeverityAlert('success')
          setIsOpenAlert(true)
        }else{
          setMsgAlert(response.message)
          setSeverityAlert('error')
          setIsOpenAlert(true)
        }
    }

    return (
        <Grid>
            <CustomizeProgress isOpen={loading} handleClose={handleClose} />
            <CustomizeAlert severity={severityAlert} isOpen={isOpenAlert} message={msgAlert} handleClose={handleCloseAlert} />
            <NavbarPage id="navbar-page" title={"Editar perfil"} />
            <Grid
                id="contenido-page"
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: "88vh", maxHeight: "88vh", overflowY: "auto" }}
            >
                <Grid id='foto-perfil'
                    sx={{minHeight: "36vh",maxHeight: "36vh"}}>
                        <Grid sx={{display:'flex',justifyContent:'center',minHeight: "31vh",maxHeight: "31vh"}}>
                            <Box
                                component="img"
                                sx={{
                                borderRadius: "50%",
                                width: "70%",
                                height: "auto",
                                display: 'block',
                                objectFit: 'cover',
                                aspectRatio: '1/1'
                                }}
                                alt="Foto capturada"
                                src={imagePreview}
                            />
                        </Grid>
                        <Grid sx={{display:'flex',justifyContent:'center',alignItems:'center',paddingY:'0.5rem',
                            minHeight: "5vh",maxHeight: "5vh"
                        }}>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    size='small'
                                    onClick={() => takePicture()}
                                    startIcon={<CameraAltIcon />}
                                    sx={{
                                    textTransform: "none"
                                    }}
                                >
                                    Capturar
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    size='small'
                                    onClick={() => pickImage()}
                                    startIcon={<CollectionsIcon />}
                                    sx={{
                                    textTransform: "none",
    
                                    }}
                                >
                                    Galería
                                </Button>
                            </Grid>
                        </Grid>
                </Grid>
                <Grid 
                    sx={{minHeight: "52vh",maxHeight: "52vh",
                        width:'100%',paddingX:'1rem',paddingY:'1rem'}}
                >
                    <Grid gap={2} container>
                        <Grid item sx={{width:'100%'}}>
                            <TextField
                               error={!!errors.nombreCompleto}
                               helperText={errors.nombreCompleto?.message}
                               name="nombreCompleto"
                               fullWidth
                               placeholder="Nombre completo"
                               {...register("nombreCompleto", {
                                 required: "El nombre del usuario es obligatorio",
                               })}
                            />
                        </Grid>
                        <Grid item sx={{width:'100%'}}>
                            <TextField
                                error={!!errors.nombreUsuario}
                                helperText={errors.nombreUsuario?.message}
                                name="nombreUsuario"
                                fullWidth
                                placeholder={usuario?.nombreUsuario}
                                {...register("nombreUsuario", {
                                    required: "El nombre de usuario",
                                })}
                                />
                        </Grid>
                        <Grid item sx={{width:'100%'}}>
                            <TextField
                                error={!!errors.descripcion}
                                helperText={errors.descripcion?.message}
                                name="descripcion"
                                fullWidth
                                placeholder={usuario?.descripcion? usuario.descripcion :  'Descripcion'}
                                {...register("descripcion")}
                                />
                        </Grid>
                    </Grid>
                    <Grid sx={{ width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop:'2rem' }}>
                        <Button variant="contained" fullWidth size="large" onClick={handleSubmit(onSubmit)}
                             sx={{ justifyContent: "space-between" }} >
                            <Typography variant="h6" overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>Actualizar</Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default EditProfile
