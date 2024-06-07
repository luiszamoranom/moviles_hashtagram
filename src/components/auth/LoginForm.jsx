import { Button, Grid, TextField } from '@mui/material';

export const LoginForm = () => {
  return (
    <Grid container justifyContent="center" gap={ 2 }
      sx={ {
        my: 5
      } }
    >
      <Grid item xs={ 10 }>
        <TextField fullWidth placeholder="Nombre de usuario" />
      </Grid>
      <Grid item xs={ 10 }>
        <TextField fullWidth placeholder="La password máster" />
      </Grid>
      <Grid item xs={ 10 }>
        <Button
          variant="contained"
          fullWidth
          sx={ { py: 0.5, fontSize: 28, textTransform: 'none', fontWeight: 400, mt: 2 } }
        >
          Ingresar
        </Button>
      </Grid>
    </Grid>
  );
};