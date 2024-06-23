import { Grid, Typography } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import ToolbarCustom from "../components/toolbar/Toolbar";
import Feed from "./feed/Feed";

const Layout = () => {
  return (
    <Grid
      container
      direction="column"
      sx={{ minHeight: "100vh", maxHeight: "100vh", width: "100vw" }}
    >
      <Grid item sx={{ minHeight: "10%", maxHeight: "10%", width: "100vw" }}>
        <ToolbarCustom />
      </Grid>
      <Grid
        item
        sx={{
          flex: 1,
          overflowY: "auto",
          backgroundColor: "gray",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Feed />
      </Grid>
      <Grid item sx={{ minHeight: "10%", maxHeight: "10%", width: "100vw" }}>
        <Navbar />
      </Grid>
    </Grid>
  );
};

export default Layout;
