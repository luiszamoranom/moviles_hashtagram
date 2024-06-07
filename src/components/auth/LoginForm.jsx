import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../../services/authService';
import { CustomizeProgress } from '../CustomizeProgress';

export const LoginForm = () => {

  const [ isOpen, setIsOpen ] = useState( false );

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

  const onClickShowPassword = () => {
    setShowPassword( !showPassword );
  };

  const onSubmit = ( data ) => {
    // setIsOpen( true );
    login( data );
    // setIsOpen( false );
  };

  return (
    <Grid container justifyContent="center" gap={ 2 }
      sx={ {
        my: 5
      } }
    >
      <Grid item xs={ 10 }>
        <TextField
          error={ !!errors.username }
          helperText={ errors.username?.message }
          name="username"
          fullWidth
          label="Nombre de usuario"
          { ...register( 'username', {
            required: "El nombre de usuario es requerido",
          } ) }
        />
      </Grid>
      <Grid item xs={ 10 }>
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
          label="Contraseña"
          { ...register( 'password', {
            required: "La contraseña es requerida",
          } ) }
          // onChange={ handleChange }
          // onBlur={ ( e ) => handleValidate( e.target.name ) }
          fullWidth
        />
      </Grid>
      <Grid item xs={ 10 }>
        <Button
          variant="contained"
          fullWidth
          sx={ { py: 0.5, fontSize: 28, textTransform: 'none', fontWeight: 400, mt: 2 } }
          onClick={ handleSubmit( onSubmit ) }
        >
          Ingresar
        </Button>
      </Grid>
      <CustomizeProgress isOpen={ isOpen } handleClose={ handleClose } />
    </Grid>
  );
};