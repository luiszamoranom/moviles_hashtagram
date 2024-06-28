import { Box, Button, Grid, Skeleton, Typography } from '@mui/material'
import React from 'react'

const PublicacionSkeleton = () => {
  return (
    <Grid>
      <Grid id='info-usuario' 
      gap={0.2} sx={{minHeight:"5dvh",maxHeight:"5dvh",width:"100%",backgroundColor:"white",display:'flex',
      paddingX:'0.5rem',paddingY:'0.25rem',justifyContent:'center',alignItems:'center'}}>
        <Grid  >
            <Skeleton animation="wave" variant="circular" width={'2rem'} height={'2rem'} />
        </Grid>
        <Grid width={'100%'} paddingX='1rem'>
            <Skeleton variant="text"  sx={{ fontSize: '1rem' }} />
        </Grid>
      </Grid>
      <Grid id='imagen-publicacion' 
        sx={{minHeight:"74vh", maxHeight:"74vh", display:'flex', alignItems:'center',
           justifyContent:'center', position: 'relative',overflow: 'hidden'}}
      >
        <Skeleton variant="rounded" width='90vw' height='74vh' />
      </Grid>
      <Grid id='detalles-publicacion' 
        sx={{
          minHeight: "9dvh",
          maxHeight: "9dvh",paddingX:"1.5rem",
          width:'100vw',justifyContent:'center',alignItems:'center'
        }}
      >
         <Grid sx={{minHeight: '100%',paddingY:"1rem"}}>
          <Grid>
            <Skeleton variant="text" width={'30%'} sx={{ fontSize: '1rem' }} />
          </Grid>
          <Grid>
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PublicacionSkeleton
