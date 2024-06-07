import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../../services/authService';
import { CustomizeProgress } from '../CustomizeProgress';
import CustomizeAlert from '../shared/Alert';

export const LoginForm = () => {

  const [ isOpen, setIsOpen ] = useState( false );
  // const navigate = useNavigate();

  // Alerta
  //ALERT
  const [ isOpenAlert, setIsOpenAlert ] = useState( false );
  const [ msgAlert, setMsgAlert ] = useState( '' );

  const [ showPassword, setShowPassword ] = useState( false );

  const form = useForm( {
    defaultValues: {
      username: '',
      password: ''
    }
  } );

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const handleClose = () => {
    setIsOpen( false );
  };

  const handleCloseAlert = () => {
    setIsOpenAlert( false );
  };

  const onClickShowPassword = () => {
    setShowPassword( !showPassword );
  };

  const onSubmit = async ( data ) => {
    setIsOpen( true );

    const response = await login( data );

    if ( response.success ) {
      // navigate('/feed');
    } else {
      setMsgAlert( 'Credenciales incorrectas' );
    }
    setIsOpenAlert( true );
    setIsOpen( false );
  };

  return (
    <Grid
      container
      // direction="column"
      gap={ 2 }
      maxWidth="90%"
      sx={ {
        my: 5,
        mx: 'auto'
      } }
    >
      <Grid item xs={ 12 }>
        <TextField
          error={ !!errors.username }
          helperText={ errors.username?.message }
          name="username"
          fullWidth
          placeholder="Nombre de usuario"
          { ...register( 'username', {
            required: "El nombre de usuario es requerido",
          } ) }
        />
      </Grid>
      <Grid item xs={ 12 }>
        <TextField
          error={ !!errors.password }
          helperText={ errors.password?.message }
          name="password"
          type={ showPassword ? 'text' : 'password' }
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
          placeholder="Contraseña"
          { ...register( 'password', {
            required: "La contraseña es requerida",
          } ) }
          // onChange={ handleChange }
          // onBlur={ ( e ) => handleValidate( e.target.name ) }
          fullWidth
        />
      </Grid>
      <Grid item xs={ 12 }>
        <Button
          variant="contained"
          fullWidth
          size='large'
          sx={ { py: 1, textTransform: 'none', fontWeight: 400, mt: 2 } }
          onClick={ handleSubmit( onSubmit ) }
        >
          Ingresar
        </Button>
      </Grid>
      <CustomizeProgress isOpen={ isOpen } handleClose={ handleClose } />
      <CustomizeAlert severity={ 'error' } isOpen={ isOpenAlert } message={ msgAlert } handleClose={ handleCloseAlert } />
    </Grid>
  );
};