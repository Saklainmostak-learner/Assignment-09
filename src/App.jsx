import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Facilities from "./pages/Facilities";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import FacilityDetails from "./pages/FacilityDetails";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/facility/:id" element={<FacilityDetails/>}/>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
export default App;
