import React, { useState, useEffect } from "react";

import {
  Outlet,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ArticleIcon from "@mui/icons-material/Article";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const dashboardNavItems = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: DashboardIcon,
    roles: ["admin", "editor"],
  },

  {
    label: "Reports",
    to: "/dashboard/reports",
    icon: AssessmentIcon,
    roles: ["admin", "editor"],
  },

  {
    label: "Users",
    to: "/dashboard/users",
    icon: PeopleIcon,
    roles: ["admin"],
  },

  {
    label: "Articles",
    to: "/dashboard/articles",
    icon: ArticleIcon,
    roles: ["admin", "editor"],
  },
];

const getPageTitle = (pathname) =>
  dashboardNavItems.find(
    (t) => t.to === pathname
  )?.label ?? "Dashboard";

const DashLayout = () => {

  const [open, setOpen] = useState(true);

  const location = useLocation();

  const navigate = useNavigate();

  const userType =
    localStorage.getItem("type");

  const pageTitle =
    getPageTitle(location.pathname);

  // BLOCK VIEWERS
  useEffect(() => {

    if (
      userType === "viewer" ||
      !userType
    ) {

      localStorage.clear();

      navigate("/auth/signin");

    }

  }, [navigate, userType]);

  // BLOCK EDITOR FROM USERS PAGE
  useEffect(() => {

    if (
      userType === "editor" &&
      location.pathname ===
      "/dashboard/users"
    ) {

      navigate("/dashboard");

    }

  }, [
    location.pathname,
    navigate,
    userType,
  ]);

  const handleLogout = () => {

    localStorage.clear();

    navigate("/auth/signin");

  };

  return (

    <div className="flex min-h-screen bg-zinc-100 text-zinc-900">

      {/* SIDEBAR */}
      <aside
        className={`border-r-2 border-zinc-900 bg-zinc-50 transition-all duration-300 ${
          open ? "w-64" : "w-20"
        }`}
      >

        {/* TOGGLE */}
        <div className="flex items-center justify-between border-b-2 border-zinc-900 p-4">

          {open && (
            <span className="font-semibold">
              Menu
            </span>
          )}

          <button
            onClick={() =>
              setOpen(!open)
            }
          >
            {open
              ? <CloseIcon />
              : <MenuIcon />}
          </button>

        </div>

        {/* NAVIGATION */}
        <div className="flex flex-col gap-2 p-2">

          {dashboardNavItems
            .filter((item) =>
              item.roles.includes(userType)
            )
            .map(
              ({
                label,
                to,
                icon: Icon,
              }) => {

                const isActive =
                  location.pathname === to;

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

                    {open && (
                      <span className="text-sm">
                        {label}
                      </span>
                    )}

                  </Link>

                );

              }
            )}

        </div>

      </aside>

      {/* MAIN */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* HEADER */}
        <header className="border-b-2 border-zinc-900 bg-zinc-50 px-6 py-4 flex items-center justify-between">

          <h1 className="text-xl font-semibold">
            {pageTitle}
          </h1>

          <button
            onClick={handleLogout}
            className="rounded-2xl border-2 border-zinc-900 px-4 py-1 text-sm hover:bg-zinc-200 transition"
          >
            Logout
          </button>

        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>

      </div>

    </div>

  );

};

export default DashLayout;