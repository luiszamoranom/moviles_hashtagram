import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const NavbarPage = ({ title }) => {
  return (
    <Box sx={{ minHeight: "6vh" }}>
      <AppBar position="static" sx={{ bgcolor: "white", boxShadow: 0 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="black"
            fontSize="25px"
            component="div"
            sx={{ flexGrow: 1, fontFamily: "Lobster", letterSpacing: "1px" }}
          >
            {title}
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
