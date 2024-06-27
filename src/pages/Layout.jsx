import { Grid, Typography } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import ToolbarCustom from "../components/toolbar/Toolbar";
import Feed from "./feed/Feed";

const Layout = () => {
  return (
    <Grid
      container
      direction="column"
      sx={{ minHeight: "100dvh", maxHeight: "100dvh", width: "100vw" }}
    >
      <Grid id='toolbar' item sx={{ minHeight: "6dvh", maxHeight: "6dvh", width: "100vw" }}>
        <ToolbarCustom />
      </Grid>
      <Grid id='contenido'
        item
        sx={{
          minHeight: "88vh", 
          maxHeight: "88vh",
          overflowY: "scroll",
          alignItems: "center",
          justifyContent: "center",
          scrollSnapType: 'y mandatory'
        }}
      >
        <Feed />
      </Grid>
      <Grid id='navbar' item sx={{ minHeight: "6dvh", maxHeight: "6dvh", width: "100vw" }}>
        <Navbar />
      </Grid>
    </Grid>
  );
};

export default Layout;
