import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User, Mail, LogOut, ChevronRight, Sparkles } from "lucide-react";
import { useUserStore } from "../store/useUser";

/* =======================
   Sidebar Route Config
======================= */
const sidebarConfig = {
  "/profile": {
    title: "My Profile",
    description:
      "View and update your personal information, skills, and professional details.",
  },
  "/email": {
    title: "Send Email",
    description:
      "Compose, manage, and track emails sent to your professional contacts.",
  },
  "/edit-profile": {
    title: "Edit Profile",
    description: "Update your profile information and settings.",
  },
};

/* =======================
   Sidebar Component
======================= */
const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { userDetails, logout } = useUserStore();
  const navigate = useNavigate();

  // Safe: fallback if route is not in config
  const currentRoute = sidebarConfig[pathname as keyof typeof sidebarConfig];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col fixed left-0 top-0 w-72 h-screen bg-white border-r border-gray-100 shadow-[2px_0_12px_rgba(0,0,0,0.02)]">
      {/* 1. Dynamic Header */}
      <div className="p-8 pb-10">
        {currentRoute ? (
          <>
            <div className="flex items-center gap-2 mb-4 text-blue-600">
              <Sparkles size={20} fill="currentColor" className="opacity-80" />
              <span className="font-bold tracking-tighter text-xl">
                {currentRoute.title}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 font-medium">
              {currentRoute.description}
            </p>
          </>
        ) : (
          <div className="text-gray-400 font-semibold">No Info Available</div>
        )}
      </div>

      {/* 2. Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        <Link to="/profile">
          <SidebarLink
            icon={<User size={19} />}
            label="My Profile"
            active={pathname === "/profile"}
          />
        </Link>
        <Link to="/email">
          <SidebarLink
            icon={<Mail size={19} />}
            label="Send Email"
            active={pathname === "/email"}
          />
        </Link>
      </nav>

      {/* 3. Footer */}
      <div className="p-4 mt-auto">
        <div className="bg-gray-50/50 rounded-3xl p-4 mb-4 border border-gray-100">
          <p className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1">
            Status
          </p>
          <p className="text-xs text-gray-500 leading-tight">
            {userDetails ? "Logged in" : "Not logged in"}
          </p>
        </div>

        <button className="flex items-center justify-between w-full px-4 py-3 text-gray-400 hover:text-red-500 hover:bg-red-50/50 rounded-2xl transition-all duration-300 group">
          <div onClick={handleLogout} className="flex items-center gap-4">
            <LogOut
              size={19}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="font-semibold text-sm tracking-wide">
              Sign Out
            </span>
          </div>
          <ChevronRight
            size={14}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </button>
      </div>
    </div>
  );
};

/* =======================
   SidebarLink Component
======================= */
const SidebarLink = ({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) => {
  return (
    <button
      className={`relative flex items-center gap-4 w-full px-4 py-3.5 rounded-2xl transition-all duration-300 group
        ${active ? "bg-blue-50/50 text-blue-600" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
    >
      {active && (
        <div className="absolute left-0 w-1.5 h-6 bg-blue-600 rounded-r-full shadow-[2px_0_8px_rgba(37,99,235,0.3)]" />
      )}

      <span
        className={`${
          active ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
        } transition-colors`}
      >
        {icon}
      </span>

      <span className="font-semibold text-sm tracking-wide">{label}</span>

      {!active && (
        <ChevronRight
          size={14}
          className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
        />
      )}
    </button>
  );
};

export default Sidebar;
