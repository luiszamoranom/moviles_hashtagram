import { Grid } from '@mui/material'
import React from 'react'

const Publicacion = ({datosImagen}) => {
  return (
    <Grid>
      <Grid gap={0.2} sx={{minHeight:"10%",maxHeight:"10%",width:"100%",backgroundColor:"white",display:'flex',paddingX:'0.5rem'}}>
        <Grid sx={{width:'8%'}} >
        hola
        </Grid>
        <Grid sx={{width:'47%'}} >
        cr7oficial
        </Grid>
        <Grid sx={{width:'37%'}} >
        Puente Alto
        </Grid>
        <Grid sx={{width:'8%'}} >
        hola
        </Grid>
      </Grid>
      <Grid sx={{minHeight:"80%",maxHeight:"80%"}}>
        
      </Grid>
      <Grid sx={{minHeight:"10%",maxHeight:"10%",width:"100%",backgroundColor:"white",paddingX:'0.5rem'}}>

      </Grid>
    </Grid>
  )
}

export default Publicacion
