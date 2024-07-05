import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import SendIcon from '@mui/icons-material/Send';
import { Box, Button, FormGroup, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import CustomizeProgress from "../../components/CustomizeProgress";
import { NavbarPage } from "../../components/navbar/NavbarPage";
import CustomizeAlert from "../../components/shared/Alert";
import useAlert from "../../hooks/useAlert";
import useCustomProgress from "../../hooks/useCustomProgress";
import useGeolocation from "../../hooks/useGeolocation";
import useUsuarioCache from "../../hooks/usuario/useUsuarioCache";
import { getCity } from "../../services/positionService";
import { subirPublicacion } from "../../services/publicacionService";
import LayoutWithNavbar from "../LayoutWithNavbar";

export const UploadPhoto = () => {
  const location = useLocation();
  const {position,error,getPosition} = useGeolocation();
  const photo = location.state.photo;
  const {loading,setLoading,handleClose} = useCustomProgress()
  const [isCapture,setIsCapture] = useState(false);
  const {isOpenAlert,setIsOpenAlert,msgAlert,setMsgAlert,severityAlert,setSeverityAlert,handleCloseAlert} = useAlert()
  const navigate = useNavigate()
  
  const {userCredentials} = useUsuarioCache()

  const hashtagRegex = /^(#\w{4,11}\s)*#\w{4,11}$/;
  const { register:publicacion, handleSubmit ,formState: { errors },watch,setValue } = useForm({
    defaultValues: {
      description: '',
      hashtags: '',
      geolocation: 'Capture ubicación'
    }
  });
  const capturaPosition = async () => {
    setLoading(true);
    try {
      // Solicitar permisos y obtener las coordenadas
      await getPosition();
      if (error) {
        throw new Error(error);
      }
      // Si se obtienen las coordenadas correctamente
      if (position) {
        const ciudad = await getCity(position.coords.latitude, position.coords.longitude);
        setValue("geolocation", ciudad);
        setIsCapture(true);
      }
    } catch (err) {
      console.error('Error obteniendo la posición:', err);
      setMsgAlert('Asegurarse que el GPS está encendido o vuelva atrás para intentar nuevamente', err)
      setSeverityAlert('warning')
      setIsOpenAlert(true)
      // Manejo de errores, por ejemplo:
      // Mostrar mensaje de error al usuario, o intentar obtener la posición nuevamente
    } finally {
      setLoading(false);
    }
  };
  const onSubmit = async (data) => {
    setLoading(true)
    let separados = data.hashtags.split(" ")
    for (let i = 0; i<separados.length; i++){
      separados[i] = separados[i].substring(1)
    }
    const response = await subirPublicacion(userCredentials?.usuarioId,data.description,data.geolocation,photo,separados)
    setLoading(false)
    if (response.success){
      setMsgAlert(response.message)
      setSeverityAlert('success')
      setIsOpenAlert(true)
      navigate('/user/home', { state: { upload: true } });
    }else{
      setMsgAlert(response.message)
      setSeverityAlert('error')
      setIsOpenAlert(true)
    }
  }

  return (
    <Grid>
      <NavbarPage title={"Subida de publicación"} />
      <CustomizeProgress isOpen={loading} handleClose={handleClose} />
      <CustomizeAlert severity={severityAlert} isOpen={isOpenAlert} message={msgAlert} handleClose={handleCloseAlert} />
      <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: "88vh", overflowY: 'scroll'}}>
        <Grid
          container
          justifyContent="start"
          alignItems="start"
          sx={{
            border: "1px solid",
            borderColor: "secondary.secondary",
            alignItems: "center",
            display: 'flex',
            justifyContent: 'center',
            width: "90dvw",
            height: "53vh",
            maxHeight: '53vh',
          }}
        >
          <Box
            component="img"
            sx={{
              alignItems: "center",
              display: 'flex',
              justifyContent: 'center',
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain"
            }}
            alt="Foto capturada"
            src={photo}
          />
        </Grid>
        <FormGroup>
          <Grid container gap={1} sx={{ width: "90dvw", height: "35vh", maxHeight: "35vh" }}>
            <Grid container sx={{marginTop:'1rem'}}>
              <Box sx={{ width: '100%'}} >
                <TextField type='text' fullWidth id='description' inputProps={{ maxLength: 50 }}
                  {...publicacion('description', {
                    required: true,
                    maxLength: {
                      value: 50,
                      message: 'La descripción no puede exceder los 50 caracteres'
                    }
                  })}
                  placeholder='Descripcion...' error={!!errors.description}
                  helperText={errors.description ? 'Este campo es requerido' : ''}
                />
              </Box>
              <Box sx={{ width: '100%'}} >
                <TextField type='text' fullWidth id='hashtags'
                  {...publicacion('hashtags', {
                    required: false,
                    validate: value => hashtagRegex.test(value) || 'Formato no válido'
                  })}
                  placeholder='#hashtag1 #hola707 ...' error={!!errors.hashtags}
                  helperText={errors.hashtags ? errors.hashtags.message : ''}
                />
              </Box>
              <Box sx={{ width: '100%'}}>
                <Button onClick={capturaPosition} variant="outlined" fullWidth size="medium"
                  endIcon={<PinDropOutlinedIcon />} sx={{ justifyContent: "space-between" }}>
                  <Typography overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>{watch("geolocation")}</Typography>
                </Button>
                <input type="hidden"
                  {...publicacion('geolocation', {
                    required: true,
                    validate: value => value !== 'Capture ubicación' || 'Por favor, capture su ubicación'
                  })}
                  value={watch("geolocation")}
                />
                {errors.geolocation && !isCapture && (
                  <Typography color="error" variant="body2">
                    {errors.geolocation.message}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid mb="5rem" sx={{ width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
              <Button variant="contained" fullWidth size="large" onClick={handleSubmit(onSubmit)}
                endIcon={<SendIcon fontSize="xl" />} sx={{ justifyContent: "space-between" }} >
                <Typography variant="h6" textOverflow='ellipsis' whiteSpace='nowrap'>Subir publicación</Typography>
              </Button>
            </Grid>
          </Grid>
        </FormGroup>
      </Grid>
    </Grid>
  );
};
