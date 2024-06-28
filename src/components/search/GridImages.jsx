import {
  Box,
  ImageList,
  ImageListItem,
  Skeleton,
  Typography,
} from "@mui/material";

export const GridImages = ( { loadingSearch, photos } ) => {
  return (
    <>
      { !loadingSearch  ? (
        <ImageList sx={ { width: "100%", height: "auto", my: 2 } } cols={ 3 }>
          { photos.length > 0 && photos.map( ( photo, index ) => (
              <ImageListItem key={ index }>
                <Box
                  component="img"
                  sx={ {
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  } }
                  alt="Foto capturada"
                  src={ photo.base64 }
                  loading="lazy"
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
