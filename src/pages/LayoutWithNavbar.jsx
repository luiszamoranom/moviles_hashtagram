import { Grid } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import CustomizeProgress from '../components/CustomizeProgress'

const LayoutWithNavbar = ({ children }) => {
  return (
    <Grid
      container
      direction="column"
      sx={{ minHeight: "100dvh", maxHeight: "100dvh", width: "100vw", overflow: "hidden" }}
    >
      <Grid
        id="contenido"
        item
        sx={{ flex: 1, overflowY: "auto", minHeight: "94dvh", maxHeight: "94dvh" }}
      >
        {children}
      </Grid>
      <Grid
        id="navbar"
        item
        sx={{ minHeight: "6dvh", maxHeight: "6dvh", width: "100vw", position: "fixed", bottom: 0 }}
      >
        <Navbar />
      </Grid>
    </Grid>
  )
}

export default LayoutWithNavbar
