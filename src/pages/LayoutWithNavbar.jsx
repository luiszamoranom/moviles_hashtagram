import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import CustomizeProgress from '../components/CustomizeProgress'
import usuarioStore from '../store/usuarioStore'

const LayoutWithNavbar = ({ children }) => {
  return (
    <Grid
      container
      direction="column"
      sx={{ minHeight: "100vh", width: "100vw", overflow: "hidden" }}
    >
      <Grid
        id="contenido"
        item
        sx={{ minHeight: "94vh" }}
      >
        {children}
      </Grid>
      <Grid
        id="navbar"
        item
        sx={{ minHeight: "6vh", width: "100vw", position: "fixed", bottom: 0 }}
      >
        <Navbar />
      </Grid>
    </Grid>
  )
}

export default LayoutWithNavbar
