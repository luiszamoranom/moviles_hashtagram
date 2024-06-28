import {
    Box,
    ImageList,
    ImageListItem,
    Skeleton,
    Typography,
  } from "@mui/material";
  
  const GridImagenPerfil = ( { loadingSearch, photos } ) => {
  
    const numberColumns = ( numberPhotos) => {
      if ( numberPhotos <= 3 ) return 1;
      if ( numberPhotos <= 12 ) return 2;
      
      return 3;
    };
  
    return (
        <>
            <ImageList sx={{ width: "100%", height: "100%", my: 2 }} cols={3}>
                {photos.length > 0 && photos.map((photo, index) => (
                    <ImageListItem key={index} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Box
                        component="img"
                        sx={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            aspectRatio: "1 / 1",
                        }}
                        alt="Foto capturada"
                        src={photo.base64}
                        loading="eager"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </>
    );
  };

export default GridImagenPerfil;