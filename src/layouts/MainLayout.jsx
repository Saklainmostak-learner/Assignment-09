import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
<div className="min-h-screen bg-background text-ink">
<Navbar/>
<Outlet/>
<Footer/>
</div>
  );
};

export default MainLayout;
