import { Grid, Toolbar, Typography } from '@mui/material'
import React from 'react'

const ToolbarCustom = () => {
  return (
    <Grid container sx={{ height:"100%",width:"100vw"}} >
        <Toolbar sx={{justifyContent:"center",alignItems:"center",width:"100vw"}}>
          
          <Typography variant="h4" textAlign="center" component="div" sx={{color: 'primary.main',fontFamily: 'Lobster',fontWeight: 'semibold',}}>
          Hashtagram
          </Typography>
        </Toolbar>
    </Grid>
  )
}

export default ToolbarCustom
