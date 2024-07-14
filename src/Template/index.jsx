import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import { PiUserBold, PiHouseLineBold, PiAppWindowBold } from "react-icons/pi";
import { useState } from "react";

// Top Navigation Component
function TopNav() {
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <nav className="w-full md:w-3/4 z-50 border rounded-tr-xl flex justify-end rounded-br-xl p-2 absolute top-0 right-0">
      <aside className="md:border rounded md:p-1 mr-5 relative view-profile md:bg-green-100">
        <div
          className="w-[50px] h-[50px] p-2 rounded-full border cursor-pointer"
          onClick={toggleDropdown}
        >
          <PiUserBold className="text-3xl" />
        </div>
        <div
          className={`absolute w-[150px] right-0 mt-2 p-1 bg-green-100 ${
            isDropdownVisible ? "block" : "hidden"
          }`}
        >
          <Link className="p-2 block" to="/profile">
            View Profile
          </Link>
          <section className="p-2 cursor-pointer" onClick={() => navigate("/")}>
            Logout
          </section>
        </div>
      </aside>
    </nav>
  );
}

// Side Navigation Component
function SideNav() {
  return (
    <aside className="w-fit md:w-1/4 h-[99vh] absolute border rounded-xl rounded-t-none rounded-tl-none">
      <div className="hidden sm:block p-1 h-fit w-fit mx-auto md:mx-5 border rounded-xl md:p-3 md:h-16 mt-2 text-xl md:text-3xl font-bold">
        Career Path
      </div>
      <div className="sm:hidden p-1 h-fit w-fit mx-auto md:mx-5 border rounded-xl md:p-3 md:h-16 mt-2 text-xl md:text-3xl font-bold">
        Cp
      </div>
      <nav className="lg:mt-6 mt-8 border rounded-xl mx-1 sm:mx-5 py-3">
        <NavLink to="/app" className="p-3 flex items-center">
          <PiHouseLineBold />
          <span className="ml-2 hidden sm:inline-block">Home</span>
        </NavLink>
        <NavLink to="/main" className="p-3 flex items-center">
          <PiAppWindowBold />
          <span className="ml-2 hidden sm:inline-block">Main</span>
        </NavLink>
      </nav>
      <section className="text-sm absolute bottom-3 w-full mx-auto md:flex justify-evenly hidden">
        Developer:
        <p className="text-slate-400">Twitter</p>
        <p className="text-slate-400">LinkedIn</p>
        <p className="text-slate-400">Github</p>
      </section>
    </aside>
  );
}

// Dashboard Layout Component
export default function DashBoardLayout({ children }) {
  return (
    <section className="relative">
      <TopNav />
      <SideNav />
      <div className="absolute ml-3 top-[90px] right-0 md:w-[73%] sm:w-[85%] w-[80%]">
        <div className="border rounded-xl border-r-0 h-[83vh] p-5 overflow-y-auto">
          {children ? children : <Outlet />}
        </div>
        <footer className="text-gray-400 text-center">
          <small>Copyright 2024</small>
        </footer>
      </div>
    </section>
  );
}
