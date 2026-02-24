import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  return (
    <div className="flex bg-slate-50 min-h-screen custom-scroll">
      <Sidebar />
      <main className="flex-1 overflow-y-auto w-full ml-72">
        <div className="max-w-7xl mx-auto p-6 lg:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
