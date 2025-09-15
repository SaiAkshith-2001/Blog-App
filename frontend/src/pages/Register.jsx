import { useContext, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Tooltip,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Radio,
  CircularProgress,
} from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SnackbarContext } from "../context/SnackbarContext";
import userService from "../services/userService";

const registrationValidationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(6, "Username should be of minimum 6 characters length"),
  email: Yup.string()
    .required("email is required")
    .email("Invalid email format")
    .lowercase("Email must be lowercase")
    .trim("Remove extra spaces")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email contains invalid characters"
    ),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password should be of minimum 8 characters length"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const Register = () => {
  const { setSnackbar } = useContext(SnackbarContext);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };
  const roles = ["Guest", "User", "Admin"];
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registrationValidationSchema),
  });

  const redirectToLogin = () => {
    navigate("/login");
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      const reqPayload = {
        email: data.email,
        username: data.username,
        password: data.password,
        role: selectedRole,
      };
      const response = await userService.register(reqPayload);
      redirectToLogin();
      setSnackbar({
        open: true,
        message: response.data.message,
        severity: "success",
      });
    } catch (error) {
      console.error("Login failed", error);
      if (error.response) {
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
  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        py: { xs: 10 },
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
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
            placeholder="Email"
            name="email"
            required
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("email")}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
          <TextField
            placeholder="Password"
            name="password"
            required
            variant="outlined"
            margin="normal"
            fullWidth
            type={showPassword ? "text" : "password"}
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
          <TextField
            placeholder="Confirm Password"
            name="confirmPassword"
            required
            variant="outlined"
            margin="normal"
            fullWidth
            type={showPassword ? "text" : "password"}
            {...register("confirmPassword")}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword?.message}
          />
          <Box sx={{ p: 2 }}>
            <FormControl>
              <RadioGroup
                row
                name="role"
                value={selectedRole}
                onChange={handleRoleChange}
              >
                {roles.map((role, index) => (
                  <FormControlLabel
                    key={index}
                    value={role}
                    control={<Radio />}
                    label={<Typography>{role}</Typography>}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ textTransform: "none", my: 2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Register"
            )}
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
        </form>
      </Box>
    </Container>
  );
};
export default Register;
