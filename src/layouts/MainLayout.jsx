import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
<div className="min-h-screen bg-background text-ink">
<Navbar/>
<Outlet/>
</div>
  );
};

export default MainLayout;
