import { Box, Grid, Typography } from "@mui/material";
import { LoginForm } from "../../components/auth/LoginForm";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const onGoToRegister = () => {
    navigate("/register");
  };

  return (
    <Grid
      container
      direction="column"
      minHeight="100vh"
      width="100dvw"
      justifyContent={"center"}
      alignItems="center"
    >
      <Grid
        container
        direction="column"
        minHeight="100vh"
        width="100dvw"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
      >
        <Grid
          container
          direction="column"
          my="auto"
          justifyContent="center"
          alignItems="center"
          width={"90%"}
          gap={4}
          py={4}
        >
          <Grid>
            <Typography
              variant="h2"
              textAlign="center"
              sx={{
                fontWeight: "semibold",
                backgroundColor: "primary.main",
                color: "white",
                fontFamily: "Lobster",
                height: "auto",
                px: 1.5,
                letterSpacing: "2px",
              }}
            >
              Hashtagram
            </Typography>
          </Grid>
          <Grid>
            <LoginForm />
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="center"
          gap={1}
          width="90%"
          sx={{
            borderTop: "1px solid",
            borderTopColor: "secondary.main",
            fontSize: "16px",
            pt: 2,
            mb: 4,
          }}
        >
          <Typography color="secondary.main">¿No tienes una cuenta?</Typography>
          <Box onClick={onGoToRegister} sx={{ cursor: "pointer" }}>
            <Typography color="primary.secondary">Regístrate</Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};
