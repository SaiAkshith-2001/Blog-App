import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import AppNavBar from "./components/AppNavBar";
import CustomBackdrop from "./components/CustomBackdrop";
// import Footer from "./components/Footer";
function App() {
  return (
    <BrowserRouter>
      <AppNavBar />
      <Suspense fallback={<CustomBackdrop />}>
        <AppRoutes />
      </Suspense>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
export default App;
