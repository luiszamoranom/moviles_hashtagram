import {
    Box,
    ImageList,
    ImageListItem,
    Grid,
    Typography,
  } from "@mui/material";
  import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
  
  const GridImagenPerfil = ({ loadingSearch, photos }) => {
    return (
      <Grid 
        id='grid-imagenes-perfil' 
        container
        sx={{ width: "100%", height: "100%", borderTop: "1px solid", borderColor: 'gray', my: 2 }}
      >
        {photos?.length > 0 ? (
          <ImageList sx={{ width: "100%", height: "100%" }} cols={3}>
            {photos.map((photo, index) => (
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
        ) : (
          <Grid
            container
            sx={{
              maxWidth: "100%",
              height: "100%",
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Grid
              item
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                maxHeight: "15vh",
                minHeight: "15vh",
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <CollectionsOutlinedIcon sx={{ fontSize: 70 }} />
              <Typography>Aún no hay publicaciones</Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    );
  };
  
  export default GridImagenPerfil;
  