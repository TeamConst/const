// React-hook-form
import { useForm } from "react-hook-form";

// axios
import axios from "axios";

// MUI - Component
import { Avatar, Typography, Container, Grid, TextField, Box, Button } from "@mui/material";

// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// MUI - style
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const LoginForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await axios.post("http://localhost:8080/api/login", data);
      console.log(result);

      window.location.href = "http://localhost:8080/";
    } catch (err) {
      console.log("로그인 오류에연");
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container maxWidth="xs">
            <Box
              sx={{
                marginTop: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src="/img/ConstLogo.png " width={"250px"} />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Artist Id"
                    autoFocus
                    {...register("id2", {
                      required: true,
                      maxLength: 80,
                    })}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    type="password"
                    fullWidth
                    label="Artist Password"
                    autoFocus
                    {...register("password", {
                      required: true,
                      maxLength: 80,
                    })}
                  />
                </Grid>
              </Grid>

              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Login
              </Button>
            </Box>
          </Container>
        </form>
      </ThemeProvider>
    </div>
  );
};

export default LoginForm;
