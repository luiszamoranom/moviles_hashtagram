import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import { Button, Grid, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomNotification from "./Notification";

const ToolbarCustom = () => {
  const navigate = useNavigate();

  return (
    <Grid container sx={{ height: "100%", width: "100vw" }}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "100vw",
          padding: "0",
        }}
      >
        <CustomNotification />

        <Typography
          variant="h4"
          textAlign="center"
          component="div"
          sx={{
            color: "primary.main",
            fontFamily: "Lobster",
            fontWeight: "semibold",
          }}
        >
          Hashtagram
        </Typography>

        <Button onClick={() => navigate("/user/camara")}>
          <CameraAltRoundedIcon />
        </Button>
        {/* <ViewCamera /> */}
      </Toolbar>
    </Grid>
  );
};

export default ToolbarCustom;
