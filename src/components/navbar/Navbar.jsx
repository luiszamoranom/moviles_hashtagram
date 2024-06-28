import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { BottomNavigation, BottomNavigationAction, Grid } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [value, setValue] = useState(1);
  const navigate = useNavigate()
  return (
    <Grid container sx={{ height: "100%", width: "100vw" }}>
      <BottomNavigation
        sx={{
          width: "100vw",
          backgroundColor: "primary.main",
          color: "#000AFF",
        }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          onClick={()=>navigate('/user/search')}
          icon={
            <SearchRoundedIcon
              fontSize="large"
              sx={{ color: value === 0 ? "white" : "#CCB2F1" }}
            />
          }
        />
        <BottomNavigationAction onClick={()=>navigate('/user/home')}
          icon={
            <HomeRoundedIcon
              fontSize="large"
              sx={{ color: value === 1 ? "white" : "#CCB2F1" }}
            />
          }
        />
        <BottomNavigationAction
          icon={
            <PersonRoundedIcon
              fontSize="large"
              sx={{ color: value === 2 ? "white" : "#CCB2F1" }}
            />
          }
        />
      </BottomNavigation>
    </Grid>
  );
};

export default Navbar;
