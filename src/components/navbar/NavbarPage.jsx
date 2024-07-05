import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import usuarioStore from "../../store/usuarioStore";
import { useNavigate } from "react-router-dom";

export const NavbarPage = ({ title }) => {
  const [isPerfil,setIsPerfil] = useState(false)
  const {removeUserKey} = usuarioStore()
  const navigate = useNavigate()

  useEffect(() => {
    // Sync the state with the current path
    if (/^\/user\/profile/.test(location.pathname)) {
      setIsPerfil(true)
    }else{
      setIsPerfil(false)
    }
  }, [location.pathname]);

  const handleSubmit = async () => {
    await removeUserKey()
    navigate("/login",{replace:true});
  }

  return (
    <Box sx={{ height: "6vh" }}>
      <AppBar position="static" sx={{ bgcolor: "white", boxShadow: 0 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
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
          {
            isPerfil?
              <Button endIcon={<LogoutIcon />} onClick={handleSubmit}>
                Salir
              </Button>
              :<></>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
};
