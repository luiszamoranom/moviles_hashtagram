import { Box,  Button,  FormGroup,  Grid, IconButton, InputLabel, TextField, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { NavbarPage } from "../../components/navbar/NavbarPage";
import useGeolocation from "../../hooks/useGeolocation";
import { getCity } from "../../services/positionService";
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { subirPublicacion } from "../../services/publicacionService";
import useAlert from "../../hooks/useAlert";
import CustomizeProgress from "../../components/CustomizeProgress";
import CustomizeAlert from "../../components/shared/Alert";
import Navbar from "../../components/navbar/Navbar";
import LayoutWithNavbar from "../LayoutWithNavbar";
import useCustomProgress from "../../hooks/useCustomProgress";
import usuarioStore from "../../store/usuarioStore";
import useUsuarioCache from "../../hooks/usuario/useUsuarioCache";

export const UploadPhoto = () => {
  const location = useLocation();
  const {getPosition} = useGeolocation();
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
    //capturo latitud,longitud
    const obtenerCoordenadas = await getPosition()
    const ciudad = await getCity(obtenerCoordenadas.coords.latitude,obtenerCoordenadas.coords.longitude)
    setValue("geolocation",ciudad)
    setIsCapture(true)
    setLoading(false);
  }
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
      <Grid container direction="column" alignItems="center" justifyContent="center" sx={{minHeight: "88vh", maxHeight: "88vh"}}>
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
            height: "54vh",
            maxHeight: '54vh'
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
          <Grid container gap={1} sx={{ width: "90dvw", height: "34vh", maxHeight: "34vh" }}>
            <Grid container sx={{marginTop:'1rem'}}>
              <Box sx={{ width: '100%', minHeight: '4.5rem', maxHeight: '4.5rem' }} >
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
              <Box sx={{ width: '100%', minHeight: '4.5rem', maxHeight: '4.5rem' }} >
                <TextField type='text' fullWidth id='hashtags'
                  {...publicacion('hashtags', {
                    required: false,
                    validate: value => hashtagRegex.test(value) || 'Formato no válido'
                  })}
                  placeholder='#hashtag1 #hola707 ...' error={!!errors.hashtags}
                  helperText={errors.hashtags ? errors.hashtags.message : ''}
                />
              </Box>
              <Box sx={{ width: '100%', minHeight: '4.5rem', maxHeight: '4.5rem' }}>
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
            <Grid sx={{ width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
              <Button variant="contained" fullWidth size="large" onClick={handleSubmit(onSubmit)}
                endIcon={<SendIcon fontSize="xl" />} sx={{ justifyContent: "space-between" }} >
                <Typography variant="h6" overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>Subir publicación</Typography>
              </Button>
            </Grid>
          </Grid>
        </FormGroup>
      </Grid>
    </Grid>
  );
};
