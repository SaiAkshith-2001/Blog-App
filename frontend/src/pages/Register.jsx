import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  IconButton,
  Alert,
} from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Formik, Form, Field, ErrorMessage } from "formik";

const registrationValidationSchema = Yup.object({
  username: Yup.string()
    .min(6, "Username should be of minimum 6 characters length")
    .required("Username is required"),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const Register = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const redirectToLogin = () => {
    navigate("/login");
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        username: values.username,
        password: values.password,
      });
      //console.log(response.data)
      redirectToLogin();
      setSnackbar({
        open: true,
        message: "User registered Successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Registration failed", error);
      setSnackbar({
        open: true,
        message: "Invalid user, Please verify your credentials!",
        severity: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: "4rem",
        }}
      >
        <Typography variant="h4" component="h1">
          Register
        </Typography>
        <Formik
          initialValues={{
            username: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={registrationValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                autoFocus
                label="Username"
                name="username"
                helperText={<ErrorMessage name="username" />}
              />
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
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
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                helperText={<ErrorMessage name="confirmPassword" />}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ textTransform: "none", my: 2 }}
                disabled={isSubmitting}
              >
                Register
              </Button>
              <Typography sx={{ alignItems: "center" }}>
                Already have an account?{" "}
                <Button
                  variant="text"
                  onClick={redirectToLogin}
                  sx={{ textTransform: "none" }}
                >
                  Sign In
                </Button>
              </Typography>
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

export default Register;
