import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Facilities from "./pages/Facilities";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/facilities" element={<Facilities />} />
    </Routes>
  );
}
export default App;
