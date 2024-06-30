import {
  Box,
  ImageList,
  ImageListItem,
  Skeleton,
  Typography,
} from "@mui/material";
// import { useNavigate } from 'react-router-dom';

export const GridImages = ( { loadingSearch, photos } ) => {

  // const navigate = useNavigate();

  const numberColumns = ( numberPhotos) => {
    if ( numberPhotos <= 3 ) return 1;
    if ( numberPhotos <= 12 ) return 2;
    
    return 3;
  };

  const handleGoToImage = (photo) => {
    console.log('Hola')
    // navigate(`/user/search/image`, { state: { photo }, replace: true })
  }

  return (
    <>
      { !loadingSearch  ? (
        <ImageList sx={ { width: "100%", height: "100%", my: 2 } } cols={ numberColumns(photos.length) }>
          { photos.length > 0 && photos.map( ( photo, index ) => (
              <ImageListItem key={ index }>
                <Box
                  component="img"
                  sx={ {
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    cursor: 'pointer'
                  } }
                  alt="Foto capturada"
                  src={ photo.base64 }
                  loading="lazy"
                  onClick={() => handleGoToImage(photo)}
                />
              </ImageListItem>
            ) ) }
        </ImageList>
      ) : (
        <ImageList sx={ { width: "100%", height: "auto" } } cols={ 3 }>
          { Array.from( { length: 12 }, ( _, index ) => (
            <Skeleton
              key={ index }
              variant="rectangular"
              width={ "100%" }
              height={ 118 }
            />
          ) ) }
        </ImageList>
      ) }
      { !loadingSearch && photos.length === 0 && (
        <Typography
          variant="h6"
          component="h6"
          width="100%"
          textAlign="center"
          fontWeight={ 400 }
        >
          No se encontraron fotos con ese hashtag
        </Typography>
      ) }
    </>
  );
};
