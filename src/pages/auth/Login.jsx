import { Grid, Typography } from '@mui/material';
import { LoginForm } from '../../components/auth/LoginForm';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

  const navigate = useNavigate();

  const onGoToRegister = () => {
    navigate( '/register' );
  };

  return (
    <Grid
      container
      direction="column"
      minHeight="100dvh"
      width="100dvw"
      justifyContent="center"
      alignItems="center"
      gap={ 2 }
    >

      <Grid
        container
        justifyContent="center"
        sx={ {
          my: 'auto',
        } }
      >
        <Grid item sx={ { height: 'auto' } }>
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
              letterSpacing: '4px',
            } }
          >
            Hashtagram
          </Typography>
        </Grid>
        <Grid item>
          <LoginForm />
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent="center"
        gap={ 1 }
        width="80%"
        sx={ {
          borderTop: '1px solid',
          borderTopColor: 'secondary.main',
          fontSize: '16px',
          pt: 2,
          mb: 4
        } }
      >
        <Typography color="secondary.main">¿No tienes una cuenta? </Typography>
        <Typography color="primary.secondary" onClick={ onGoToRegister } >Regístrate</Typography>
      </Grid>

    </Grid>
  );
};