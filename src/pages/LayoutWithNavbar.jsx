import React, { createContext, useContext, useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import { obtenerPublicaciones } from '../services/publicacionService';
import useUsuarioCache from '../hooks/usuario/useUsuarioCache';
import publicacionStore from '../store/publicacionesStore';
import meGustaStore from '../store/meGustaStore';

// Crear el contexto
const FotosContext = createContext();

export const useFotos = () => {
  return useContext(FotosContext);
};

const LayoutWithNavbar = () => {
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userCredentials } = useUsuarioCache();
  const { getPublicaciones, setPublicacion } = publicacionStore();
  
  const getPhotos = async () => {
    const usuarioId = userCredentials.usuarioId;
    const response = await obtenerPublicaciones(usuarioId);
    if (response.success) {
      const newFotos = response.message;
      // Save new photos to local storage
      for (let i = 0; i < newFotos.length; i++) {
        await setPublicacion(newFotos[i].foto.id, newFotos[i]);
      }
      // Combine local storage photos with new photos
      const storedFotos = await getPublicaciones();
      const combinedFotos = [...storedFotos, ...new Set(newFotos.filter(newFoto => !storedFotos.some(storedFoto => storedFoto.id === newFoto.id)))];
      setFotos(combinedFotos);
    }
    setLoading(false);
  };

  const loadFotosFromStore = async () => {
    const storedFotos = await getPublicaciones();
    setFotos(storedFotos);
    setLoading(false);
  };

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      await loadFotosFromStore();
      if (userCredentials.usuarioId) {
        await getPhotos();
      }
    };

    initialize();
  }, [userCredentials]);

  return (
    <FotosContext.Provider value={{ fotos, getPhotos }}>
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
          <Outlet />
        </Grid>
        <Grid
          id="navbar"
          item
          sx={{ minHeight: "6vh", width: "100vw", position: "fixed", bottom: 0 }}
        >
          <Navbar />
        </Grid>
      </Grid>
    </FotosContext.Provider>
  );
};

export default LayoutWithNavbar;
