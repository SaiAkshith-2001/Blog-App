import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../context/AuthContext";
import { SnackbarContext } from "../context/SnackbarContext";
import { GoogleLogin } from "@react-oauth/google";
import userService from "../services/userService";

const loginValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(6, "Username should be of minimum 6 characters length"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });
  const { login } = useContext(AuthContext);
  const { setSnackbar } = useContext(SnackbarContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const sendTokenToApi = async (idToken) => {
    try {
      await login(idToken);
      if (idToken) {
        setSnackbar({
          open: true,
          message: "Login successfully",
          severity: "success",
        });
      }
    } catch (error) {
      console.error("Login failed", error);
      if (error) {
        setSnackbar({
          open: true,
          message: "Invalid username (or) password , Please try again!",
          severity: "error",
        });
      }
    }
  };
  const onSubmit = async (data) => {
    try {
      const reqPayload = {
        username: data.username,
        password: data.password,
      };
      const response = await userService.login(reqPayload);
      login(response.data.token);
      if (response.data && response.status === 200) {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "success",
        });
      }
      navigate("/read");
    } catch (error) {
      console.error("Login failed", error);
      if (error.response && error.response.status === 401) {
        setSnackbar({
          open: true,
          message: error.response.data.message,
          severity: "error",
        });
      } else {
        setSnackbar({
          open: true,
          message: "Something went wrong Please try again later!",
          severity: "error",
        });
      }
    }
  };
  const redirectToRegister = () => {
    navigate("/register");
  };
  return (
    <Container
      sx={{
        my: "6rem",
        py: { xs: 5, md: 10 },
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", lg: "50%" },
          mt: { xs: 4, lg: 0 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src="https://www.creative-tim.com/twcomponents/svg/secure-login-animate.svg"
          alt="Cover Page"
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "400px",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1">
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            placeholder="Username"
            name="username"
            required
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("username")}
            error={Boolean(errors.username)}
            helperText={errors.username?.message}
            autoFocus
          />
          <TextField
            placeholder="Password"
            name="password"
            required
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("password")}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <Tooltip title={showPassword ? "Hide" : "Show"} arrow>
                  <IconButton onClick={handleShowPassword}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </Tooltip>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ textTransform: "none", my: "2rem" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Login"
            )}
          </Button>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              // console.log(credentialResponse);
              sendTokenToApi(credentialResponse?.credential);
              navigate("/read");
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            shape="pill"
            theme="filled_black"
          />
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ mt: 3, textTransform: "none" }}
            onClick={redirectToRegister}
          >
            Create an account/Sign up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
