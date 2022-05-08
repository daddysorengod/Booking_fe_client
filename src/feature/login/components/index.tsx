import { ThemeProvider } from "@emotion/react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  createTheme,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAppSelector, useAppDispatch } from "../../../app/hook";
import { login } from "../../../interface";
import { Controller, useForm } from "react-hook-form";
import { genTokenAsync, verifyTokenAsync } from "../loginSlice";
import loginAPI from "../../../api/login";
import ToastSnankBar from "../../../common/ToastSnankBar";
import ModalForm from "../../../common/ModalForm";
import TokenModal from "../../../components/TokenModal";

const theme = createTheme();

const inputData: login = {
  username: "",
  password: "",
};

const Login = () => {
  const dispatch = useAppDispatch();
  const [alert, setAlert] = useState(false);
  const token = useAppSelector((state) => state.login.token);
  const message = useAppSelector((state) => state.login.message);
  const accountLogin = useAppSelector((state) => state.login.accountLogin);
  const { handleSubmit, control } = useForm<login>();

  const handleOpen = () => {
    if (token == "") {
      setAlert(true);
    } else {
      console.log(token);
      dispatch(verifyTokenAsync(token || ''))
    }
  };

  const onsubmit = (value: login) => {
    console.log(value);
    dispatch(genTokenAsync(value));
    handleOpen()
  };
  

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(false);
  };

  
  

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{zIndex:1}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onsubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <Controller
              name="username"
              control={control}
              defaultValue={inputData.username}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoComplete="username"
                  autoFocus
                  {...field}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue={inputData.password}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...field}
                />
              )}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      {/* <ToastSnankBar  open={alert} onClose={handleCloseAlert} message={message}/> */}
      {alert && (
        <ToastSnankBar
          open={alert}
          onClose={handleCloseAlert}
          message={message}
        />
      )}
    </ThemeProvider>
  );
};

export default Login;
