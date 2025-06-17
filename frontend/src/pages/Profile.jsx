import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Divider,
} from "@mui/material";
import { SnackbarContext } from "../context/SnackbarContext";
import { useContext } from "react";

const Profile = () => {
  const [userData, setUserData] = useState();
  const { setSnackbar } = useContext(SnackbarContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const url = process.env.REACT_APP_API_URL;
  const handleNavigateProfile = async () => {
    try {
      const response = await axios.get(`${url}/api/user/profile/${id}`);
      setUserData(response.data.data);
    } catch (error) {
      console.error("Failed to load Profile", error);
      navigate("/");
      if (error) {
        setSnackbar({
          open: true,
          message: error.response.data.message,
          severity: "error",
        });
      }
    }
  };
  useEffect(() => {
    handleNavigateProfile();
    // eslint-disable-next-line
  }, [id]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 16 }}>
      {userData && (
        <Card
          sx={{
            maxWidth: 500,
            width: "100%",
            p: 3,
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Avatar
              sx={{ width: 100, height: 100, mb: 2, bgcolor: "secondary.main" }}
              src={userData?.profilePicture}
              alt={userData?.username}
            >
              {userData?.username[0].toUpperCase()}
            </Avatar>
            <Typography variant="h5" fontWeight="bold">
              {userData?.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userData?.role}
            </Typography>
          </Box>
          <Divider sx={{ my: 3 }} />
          <CardContent>
            <Typography variant="body1" gutterBottom>
              <strong>Email:</strong> {userData?.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>User ID:</strong> {userData?._id}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Status:</strong>{" "}
              {userData?.isActive ? "Active" : "Inactive"}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Created At:</strong>{" "}
              {new Date(userData?.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Last Updated:</strong>{" "}
              {new Date(userData?.updatedAt).toLocaleDateString()}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Profile;
