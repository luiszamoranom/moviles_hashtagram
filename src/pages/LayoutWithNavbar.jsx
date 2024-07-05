import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import { obtenerPublicaciones } from '../services/publicacionService';
import useUsuarioCache from '../hooks/usuario/useUsuarioCache';

const LayoutWithNavbar = () => {
  const [fotos, setFotos] = useState([]);
  const { userCredentials } = useUsuarioCache();

  const getPhotos = async () => {
    const usuarioId = userCredentials.usuarioId;
    const response = await obtenerPublicaciones(usuarioId);
    if (response.success) {
      setFotos(response.message);
    }
  };

  useEffect(() => {
    if (userCredentials.usuarioId ) {
      getPhotos();
      console.log("Petición inicial hecha");
    }
  }, [userCredentials]);

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
        <Outlet context={{ fotos }} />
      </Grid>
      <Grid
        id="navbar"
        item
        sx={{ minHeight: "6dvh", maxHeight: "6dvh", width: "100vw", position: "fixed", bottom: 0 }}
      >
        <Navbar />
      </Grid>
    </Grid>
  );
};

export default LayoutWithNavbar;
