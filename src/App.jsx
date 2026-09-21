import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Facilities from "./pages/Facilities";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import FacilityDetails from "./pages/FacilityDetails";
import NotFound from "./pages/NotFound";
import { Suspense } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import Register from "./pages/Register";

function App() {
  return (
    <Suspense fallback={<LoadingSpinner/>}>

    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/facility/:id" element={<FacilityDetails/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
    </Suspense>
  );
}
export default App;
