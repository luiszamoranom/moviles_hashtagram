import { Grid } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import CustomizeProgress from '../components/CustomizeProgress'

const LayoutWithNavbar = ({children }) => {
  return (
    <Grid
      container
      direction="column"
      sx={{ minHeight: "100dvh", maxHeight: "100dvh", width: "100vw" }}
    >
      <Grid id='contenido' item sx={{minHeight: "94dvh", maxHeight: "94dvh"}}>
        {children}
      </Grid>
      <Grid id='navbar' item sx={{ minHeight: "6dvh", maxHeight: "6dvh", width: "100vw" }}>
        <Navbar />
      </Grid>
    </Grid>
  )
}

export default LayoutWithNavbar
