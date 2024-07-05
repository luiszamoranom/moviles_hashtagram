import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Divider, Grid, IconButton, Typography } from '@mui/material';
import { ItemNotification } from './ItemNotification';
import { Fragment } from 'react';

export const DrawerNotifications = ( { toggleDrawer } ) => {
  return (
    <Box
      sx={{ width: 'auto', height: '100vh', background: 'white'}}
      role="presentation"
    >
      <Grid container direction="row" justifyContent="center" minHeight="6vh" alignItems="center">
        <IconButton sx={{ pl: 3 }} onClick={ () => toggleDrawer(false) } >
          <ArrowBackIcon fontSize="medium" color="colorNegro" />
        </IconButton>
        <Typography
            variant="h6"
            color="black"
            fontSize="25px"
            component="div"
            textAlign="center"
            sx={{ flexGrow: 1, fontFamily: "Lobster", letterSpacing: "1px", mr: 5, py: 2 }}
          >
            Notificaciones
          </Typography>
      </Grid>
      <Grid 
        container 
        direction="column" 
        gap={4} 
        py="2rem" 
        justifyContent="center"
      >
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <Fragment key={index}> 
            <Grid 
              container 
              direction="row" 
              px="1rem" 
              gap={2}
              alignItems="center"
            >
              <ItemNotification textNotification={text} />
                
            </Grid>
            {/* Divider */}
            <Divider variant="middle" />
          </Fragment>
        ))}
      </Grid>
      
    </Box>
  )
}