import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { BottomNavigation, BottomNavigationAction, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useUsuarioCache from "../../hooks/usuario/useUsuarioCache";

const Navbar = () => {
  const [valuePage, setValue] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const {userCredentials} = useUsuarioCache()

  useEffect(() => {
    // Sync the state with the current path
    switch (location.pathname) {
      case '/user/search':
        setValue(0);
        break;
      case '/user/home':
        setValue(1);
        break;
      case '/user/profile':
        setValue(2);
        break;
      default:
        setValue(1); // default page
    }
  }, [location.pathname]);

  const handleNavigationChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/user/search');
        break;
      case 1:
        navigate('/user/home');
        break;
      case 2:
        navigate('/user/profile',{state:userCredentials?.usuarioId});
        break;
      default:
        break;
    }
  };

  return (
    <Grid container sx={{ height: "100%", width: "100vw" }}>
      <BottomNavigation
        sx={{
          width: "100vw",
          backgroundColor: "primary.main",
          color: "#000AFF",
        }}
        showLabels
        value={valuePage}
        onChange={handleNavigationChange}
      >
        <BottomNavigationAction
          icon={
            <SearchRoundedIcon
              fontSize="large"
              sx={{ color: valuePage === 0 ? "white" : "#CCB2F1" }}
            />
          }
        />
        <BottomNavigationAction
          icon={
            <HomeRoundedIcon
              fontSize="large"
              sx={{ color: valuePage === 1 ? "white" : "#CCB2F1" }}
            />
          }
        />
        <BottomNavigationAction
          icon={
            <PersonRoundedIcon
              fontSize="large"
              sx={{ color: valuePage === 2 ? "white" : "#CCB2F1" }}
            />
          }
        />
      </BottomNavigation>
    </Grid>
  );
};

export default Navbar;
