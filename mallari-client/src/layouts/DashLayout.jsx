import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const dashboardNavItems = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: DashboardIcon,
  },
  {
    label: "Reports",
    to: "/dashboard/reports",
    icon: AssessmentIcon,
  },
  {
    label: "Users",
    to: "/dashboard/users",
    icon: PeopleIcon,
  },
];

const getPageTitle = (pathname) =>
  dashboardNavItems.find((t) => t.to === pathname)?.label ?? "Dashboard";

const DashLayout = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const pageTitle = getPageTitle(location.pathname);

  return (
    <div className="flex min-h-screen bg-zinc-100 text-zinc-900">

      {/* SIDEBAR */}
      <aside
        className={`border-r-2 border-zinc-900 bg-zinc-50 transition-all duration-300 ${
          open ? "w-64" : "w-20"
        }`}
      >
        {/* Toggle */}
        <div className="flex items-center justify-between border-b-2 border-zinc-900 p-4">
          {open && <span className="font-semibold">Menu</span>}
          <button onClick={() => setOpen(!open)}>
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Nav Items */}
        <div className="flex flex-col gap-2 p-2">
          {dashboardNavItems.map(({ label, to, icon: Icon }) => {
            const isActive = location.pathname === to;

            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 rounded-2xl border-2 px-3 py-2 transition-all
                  ${
                    isActive
                      ? "border-zinc-900 bg-zinc-100"
                      : "border-transparent hover:border-zinc-900 hover:bg-zinc-100"
                  }`}
              >
                <Icon />
                {open && <span className="text-sm">{label}</span>}
              </Link>
            );
          })}
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex flex-1 flex-col">

        {/* HEADER (matches your sections) */}
        <header className="border-b-2 border-zinc-900 bg-zinc-50 px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">{pageTitle}</h1>

          <button
            onClick={() => navigate("/")}
            className="rounded-2xl border-2 border-zinc-900 px-4 py-1 text-sm hover:bg-zinc-00"
          >
            Logout
          </button>
        </header>

        {/* CONTENT */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashLayout;