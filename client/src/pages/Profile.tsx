import {
  User,
  Briefcase,
  MapPin,
  Link as LinkIcon,
  Mail,
  ShieldCheck,
  Camera,
  Edit2,
} from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUser";

export default function Profile() {
  const { userDetails, loading, getUser } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
        <div className="flex items-center justify-center h-64">
          <div className="text-slate-500">Loading profile...</div>
        </div>
      </div>
    );
  }

  const user = userDetails?.user;
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
            My Profile
          </h1>
          <p className="text-slate-500 text-sm">
            Manage your personal information and application preferences.
          </p>
        </div>
        <button
          onClick={() => navigate("/edit-profile")}
          className="px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2"
        >
          <Edit2 size={16} />
          Edit Profile
        </button>
      </div>

      <div className="space-y-6">
        {/* Header Hero Section */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
            <button className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/30 text-white rounded-lg backdrop-blur-sm transition-colors">
              <Camera size={18} />
            </button>
          </div>

          <div className="px-8 pb-8 relative">
            {/* Avatar */}
            <div className="absolute -top-16 left-8">
              <div className="h-32 w-32 rounded-2xl border-4 border-white bg-slate-100 shadow-lg relative group cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white" size={24} />
                </div>
                <div className="h-full w-full flex items-center justify-center bg-blue-50 text-blue-600 text-4xl font-bold">
                  {initials}
                </div>
              </div>
            </div>

            <div className="pt-20">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                {user?.name || "User Name"}
                <ShieldCheck className="text-blue-500" size={20} />
              </h2>
              <p className="text-slate-500 font-medium">
                {user?.contactEmail || "No contact email"}
              </p>

              <div className="flex flex-wrap items-center gap-6 mt-6">
                <div className="flex items-center gap-2 text-slate-600 text-sm">
                  <MapPin size={16} className="text-slate-400" />
                  Location not set
                </div>
                <div className="flex items-center gap-2 text-slate-600 text-sm">
                  <Mail size={16} className="text-slate-400" />
                  {user?.contactEmail || "No email"}
                </div>
                {user?.links?.linkedinLink && (
                  <div className="flex items-center gap-2 text-blue-600 text-sm font-medium cursor-pointer hover:underline">
                    <LinkIcon size={16} />
                    {user.links.linkedinLink
                      .replace("https://", "")
                      .replace("http://", "")}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
      </div>
    </div>
  );
}
