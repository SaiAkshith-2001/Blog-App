import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Container,
  Typography,
  Snackbar,
  Box,
  IconButton,
  Alert,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Formik, Form, Field, ErrorMessage } from "formik";
const loginValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, "Username should be of minimum 6 characters length")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username: values.username,
        password: values.password,
      });
      login(response.data.accessToken);
      // console.log(response.data.username);
      // console.log(response.data.accessToken);
      setSnackbar({
        open: true,
        message: "Login successfully",
        severity: "success",
      });
      navigate("/write");
    } catch (error) {
      console.error("Login failed", error);
      setSnackbar({
        open: true,
        message: "Login failed, Please verify your credentials!",
        severity: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const redirectToRegister = () => {
    navigate("/register");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: "8rem",
        }}
      >
        <Typography variant="h4" component="h1">
          Login
        </Typography>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                as={TextField}
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                name="username"
                autoFocus
                helperText={<ErrorMessage name="username" />}
              />
              <Field
                as={TextField}
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                margin="normal"
                name="password"
                helperText={<ErrorMessage name="password" />}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleShowPassword}>
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
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
                Login
              </Button>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ textTransform: "none" }}
                onClick={redirectToRegister}
              >
                Create an account/Sign up
              </Button>
              <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() =>
                  setSnackbar((prev) => ({ ...prev, open: false }))
                }
              >
                <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
                  {snackbar.message}
                </Alert>
              </Snackbar>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Login;
