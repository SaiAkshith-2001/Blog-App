import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { AppRoutes } from "./routes";
import AppNavBar from "./components/AppNavBar";
// import Footer from "./components/Footer";
function App() {
  return (
    <BrowserRouter>
      <AppNavBar />
      <Suspense
        fallback={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <CircularProgress />
          </Box>
        }
      >
        <AppRoutes />
      </Suspense>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
export default App;
