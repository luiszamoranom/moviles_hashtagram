import { Box, Button, IconButton, TextField, Grid, Typography, InputAdornment } from '@mui/material';
import { useForm } from "react-hook-form";
import CustomizeProgress from '../../components/CustomizeProgress';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registrar } from '../../services/authService';
import CustomizeAlert from '../../components/shared/Alert';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      correo: '',
      nombre_completo: '',
      nombre_usuario: '',
      contrasena: ''
    }
  });
  //PROGRESS
  const [isOpen,setIsOpen] = useState(false)
  const handleClose = (event) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpen(false);
  };
  //ALERT
  const [isOpenAlert,setIsOpenAlert] = useState(false)
  const [msgAlert,setMsgAlert] = useState('')
  const [severityAlert,setSeverityAlert] = useState('success')
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpenAlert(false);
  };

  const navigate = useNavigate()
  const handleLoginClick = () => {
    navigate('/login');
  };

  const onSubmit = async (data) => {
    setIsOpen(true)
    const response = await registrar(data.correo,data.nombre_completo,data.nombre_usuario,data.contrasena)
    if (response.success){
      setMsgAlert(response.message)
      setSeverityAlert('success')
      setIsOpenAlert(true)
      navigate('/home');
    }else{
      setMsgAlert(response.message)
      setSeverityAlert('error')
      setIsOpenAlert(true)
    }
    setIsOpen(false)
  };

  const [ showPassword, setShowPassword ] = useState( false );
  const onClickShowPassword = () => {
    setShowPassword( !showPassword );
  };

  return (
      <Grid 
        container 
        direction="column"
        minHeight="100vh"
        width="100dvw" 
        justifyContent={'center'}
        alignItems="center"
      >
        <CustomizeAlert severity={severityAlert} isOpen={isOpenAlert} message={msgAlert} handleClose={handleCloseAlert}/>
        <CustomizeProgress isOpen={isOpen} handleClose={handleClose}/>
        <Grid  
          container 
          direction="column"
          minHeight="100vh" 
          width="100dvw"
          justifyContent="space-between" 
          alignItems="center" 
          gap={ 2 }
        >
          <Grid container marginTop={'7rem'}
          justifyContent="center" gap={4}
          width={'90%'}>
            <Grid>
              <Typography
                  variant="h2"
                  textAlign="center"
                  sx={ {
                    fontWeight: 'semibold',
                    backgroundColor: 'primary.main',
                    color: 'white',
                    fontFamily: 'Lobster',
                    height: 'auto',
                    px: 1.5,
                    letterSpacing: "2px",
                  } }
                >Hashtagram</Typography>
            </Grid>
            <Grid>
              <Typography variant="h5" textAlign="center" color={'GrayText'}>
                Regístrate para ver fotos y videos de tus amigos 
              </Typography>
            </Grid>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container maxWidth={'100%'} gap={1} sx={{mb:'2rem'}} >
                <TextField type='email' fullWidth id='correo'
                  {...register('correo', { required: true })}
                  placeholder='Correo' error={!!errors.correo}
                  helperText={errors.correo ? 'Este campo es requerido' : ''}
                />
                <TextField
                  fullWidth
                  id='nombre_completo'
                  {...register('nombre_completo', { required: true })}
                  placeholder='Nombre completo'
                  error={!!errors.nombre_completo}
                  helperText={errors.nombre_completo ? 'Este campo es requerido' : ''}
                />
                <TextField
                  fullWidth
                  id='nombre_usuario'
                  {...register('nombre_usuario', { required: true })}
                  placeholder='Nombre de usuario'
                  error={!!errors.nombre_usuario}
                  helperText={errors.nombre_usuario ? 'Este campo es requerido' : ''}
                />
                <TextField
                  InputProps={ {
                    endAdornment: <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={ onClickShowPassword }
                        edge="end"
                      >
                        { showPassword ? <VisibilityOff /> : <Visibility /> }
                      </IconButton>
                    </InputAdornment>
                  } }
                  fullWidth
                  id='contrasena'
                  type={ showPassword ? 'text' : 'password' }
                  {...register('contrasena', { required: true })}
                  placeholder='Contraseña'
                  error={!!errors.contrasena}
                  helperText={errors.contrasena ? 'Este campo es requerido' : ''}
                />
              </Grid>
              <Grid maxWidth={'100%'}> 
                <Button variant="contained" type='submit' size='large' fullWidth>
                  Regístrate
                </Button>
              </Grid>
            </form>
          </Grid>
          <Grid container justifyContent="center" gap={1} width="90%" 
          sx={ {
            borderTop: '1px solid',
            borderTopColor: 'secondary.main',
            fontSize: '16px',
            pt: 2,
            mb: 4
          } }>
            <Typography color="secondary.main">¿Ya tienes una cuenta? </Typography>
            <Box onClick={handleLoginClick} sx={{ cursor: 'pointer' }}>
              <Typography color="primary.secondary">Inicia sesión</Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
  );
};
