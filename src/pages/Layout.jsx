import { Grid } from '@mui/material'
import React from 'react'
import Navbar from '../components/navbar/Navbar'
import ToolbarCustom from '../components/toolbar/Toolbar'

const Layout = () => {
  return (
    <Grid container direction="column" 
    sx={{minHeight:"100vh",maxHeight:"100vh",width:"100vw"}}>
        <Grid item sx={{ minHeight: '10%', maxHeight: '10%',width:'100vw' }}>
            <ToolbarCustom />
        </Grid>
        <Grid item sx={{flex:1,overflowY:"auto",backgroundColor:"primary.secondary"}}>
            <h1>Al medio van las publicaciones</h1>
        </Grid>
        <Grid item sx={{ minHeight: '10%', maxHeight: '10%',width:'100vw' }}>
            <Navbar />
        </Grid>
    </Grid>
  )
}

export default Layout
