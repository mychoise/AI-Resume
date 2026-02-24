import { Outlet } from "react-router-dom";
// import "./index.css";
import { Toaster } from "react-hot-toast";

export default function RootLayout() {
  return (
    <div className="font-sans antialiased min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <Outlet />
    </div>
  );
}
