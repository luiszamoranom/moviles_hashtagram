import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { GridImages } from "../../components/search/GridImages";
import { usePhotosByHashtag } from "../../hooks/photos/usePhotosByHashtag";
import LayoutWithNavbar from "../LayoutWithNavbar";

const STATUS = {
  START: "START",
  SEARCH: "SEARCH",
  ERROR: "ERROR",
};

export const Search = () => {

  const { photos, isLoading, getPhotosByHashtag } = usePhotosByHashtag();

  const [ statusApp, setStatusApp ] = useState( STATUS.START );

  const [ searchValue, setSearchValue ] = useState( "" );

  const handleInputChange = ( { target } ) => {
    setSearchValue( target.value );
  };

  const handleSubmit = async ( e ) => {
    setStatusApp( STATUS.SEARCH );
    e.preventDefault();
    try {
      await getPhotosByHashtag( searchValue );
    } catch ( error ) {
      setStatusApp( STATUS.ERROR );
    }
  };

  return (
    <LayoutWithNavbar>
       <Grid
        id="contenido-page"
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "94vh", maxHeight: "94vh", overflowY: "auto" }}
            >
          <Grid container minHeight="8vh" maxHeight="8vh" px={ 2 } py={ 1 }>
            <Box component="form" width="100%" onSubmit={ handleSubmit }>
              <TextField
                color="searchInput"
                variant="outlined"
                fullWidth
                focused
                placeholder="Buscar..."
                value={ searchValue }
                onChange={ handleInputChange }
                InputProps={ {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="searchInput" />
                    </InputAdornment>
                  ),
                  sx: {
                    borderWidth: "1rem",
                    borderRadius: 2,
                    color: "searchInput.main",
                    "& .MuiInputBase-input::placeholder": {
                      color: "searchInput.main", // Cambia el color aquí
                      opacity: 1, // Asegúrate de que sea visible
                    },
                  },
                } }
              />
            </Box>
          </Grid>
          <Grid
          container
          // flex={ 1 }
          minHeight="86vh"
          maxHeight="86vh"
          alignItems="start"
        >
          { statusApp === STATUS.SEARCH && (
            <GridImages loadingSearch={ isLoading } photos={ photos } />
          ) }
          { statusApp === STATUS.START && (
            <Typography
              variant="h6"
              component="h6"
              width="100%"
              textAlign="center"
              fontWeight={ 400 }
              mt={ 4 }
            >
              Ingresa un hashtag para buscar fotos
            </Typography>
          ) }
          { statusApp === STATUS.ERROR && (
            <Typography
              variant="h6"
              component="h6"
              width="100%"
              textAlign="center"
              fontWeight={ 400 }
              color="error"
              mt={ 4 }
            >
              No se pudo buscar fotos con ese hashtag
            </Typography>
          ) }
          </Grid>
      </Grid>
    </LayoutWithNavbar>
  );
};
