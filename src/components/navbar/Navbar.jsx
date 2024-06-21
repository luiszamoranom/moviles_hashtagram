import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { BottomNavigation, BottomNavigationAction, Grid } from "@mui/material";
import { useState } from "react";

const Navbar = () => {
  const [value, setValue] = useState(1);
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
          icon={
            <SearchRoundedIcon
              fontSize="large"
              sx={{ color: value === 0 ? "white" : "#CCB2F1" }}
            />
          }
        />
        <BottomNavigationAction
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
