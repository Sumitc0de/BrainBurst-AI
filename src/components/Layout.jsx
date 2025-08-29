import { Outlet } from "react-router-dom";
import MenuSection from "../components/MenuSection";

const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Always visible */}
      <MenuSection />

      {/* Right Side - Changes with routes */}
      <div className="flex-1 bg-gray-100 overflow-y-auto">

        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
