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

export const UploadPhoto = () => {
  const location = useLocation();
  const {getPosition} = useGeolocation();
  const photo = location.state.photo;
  const [loading, setLoading] = useState(false);
  const [isCapture,setIsCapture] = useState(false);
  const {isOpenAlert,setIsOpenAlert,msgAlert,setMsgAlert,severityAlert,setSeverityAlert,handleCloseAlert} = useAlert()
  const navigate = useNavigate()
  
  const handleClose = (event) => {
    if (reason === 'clickaway') {
      return;
    }
    setLoading(false);
  };

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
    const response = await subirPublicacion(1,data.description,data.geolocation,photo,separados)
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
    <Grid
      container
      direction="column"
      justifyContent="start" alignItems='center'
      sx={{ height: "100dvh", width: "100dvw" }}
    >
      <NavbarPage title={"Subida de publicación"} />
      <CustomizeAlert severity={severityAlert} isOpen={isOpenAlert} message={msgAlert} handleClose={handleCloseAlert}/>
      <CustomizeProgress isOpen={loading} handleClose={handleClose}/>
      {/* Foto capturada */}
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Grid
          container
          justifyContent="start"
          alignItems="start"
          sx={{
            border: "1px solid",
            borderColor: "secondary.secondary",
            alignItems:"center",
            display:'flex',
            justifyContent:'center',
            width: "90dvw",
            height: "50dvh",
          }}
        >
          {
            <Box
              component="img"
              sx={{
                //height: "100%",
                alignItems:"center",
                display:'flex',
                justifyContent:'center',
                width: "100%",
              }}
              alt="Foto capturada"
              src={photo}
            />
          }
        </Grid>
      </Grid>
      <FormGroup>
        <Grid container gap={2} sx={{ width: "90dvw", height: "40dvh",maxHeight: "40dvh" }}>
          <Grid container sx={{ paddingY: "1rem" }}>
            <Box sx={{width:'100%',minHeight:'4.5rem',maxHeight:'4.5rem'}} >
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
            <Box sx={{width:'100%',minHeight:'4.5rem',maxHeight:'4.5rem'}} >
              <TextField type='text' fullWidth id='hashtags'
                {...publicacion('hashtags', {
                  required: false,
                  validate: value => hashtagRegex.test(value) || 'Formato no válido'
                })}
                placeholder='#hashtag1 #hola707 ...' error={!!errors.hashtags}
                helperText={errors.hashtags ? errors.hashtags.message : ''}
              />
            </Box>
            <Box sx={{width:'100%',minHeight:'4.5rem',maxHeight:'4.5rem'}}>
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
              {errors.geolocation && !isCapture  && (
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
  );
};
