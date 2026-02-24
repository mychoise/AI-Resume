import React, { useState, useEffect } from "react";
import { ArrowLeft, Save, Upload, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUser";

export default function EditProfile() {
  const navigate = useNavigate();
  const { userDetails, loading, addUser, isSubmitting } = useUserStore();

  const [formData, setFormData] = useState({
    name: "",
    contactEmail: "",
    githubLink: "",
    linkedinLink: "",
    portfolioLink: "",
    techStack: [] as Array<{
      name: string;
      level: "beginner" | "intermediate" | "advanced";
      yearsOfExperience: number;
    }>,
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [newTech, setNewTech] = useState({
    name: "",
    level: "intermediate" as const,
    yearsOfExperience: 1,
  });

  useEffect(() => {
    if (userDetails?.user) {
      setFormData({
        name: userDetails.user.name || "",
        contactEmail: userDetails.user.contactEmail || "",
        githubLink: userDetails.user.links?.githubLink || "",
        linkedinLink: userDetails.user.links?.linkedinLink || "",
        portfolioLink: userDetails.user.links?.portfolioLink || "",
        techStack: userDetails.user.techStack || [],
      });
    }
  }, [userDetails]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTech = () => {
    if (newTech.name.trim()) {
      setFormData((prev) => ({
        ...prev,
        techStack: [...prev.techStack, { ...newTech }],
      }));
      setNewTech({ name: "", level: "intermediate", yearsOfExperience: 1 });
    }
  };

  const handleRemoveTech = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("contactEmail", formData.contactEmail);
    submitData.append("techStack", JSON.stringify(formData.techStack));
    submitData.append(
      "links",
      JSON.stringify({
        githubLink: formData.githubLink,
        linkedinLink: formData.linkedinLink,
        portfolioLink: formData.portfolioLink,
      }),
    );

    if (resumeFile) {
      submitData.append("resume", resumeFile);
    }

    try {
      await addUser(submitData);
      navigate("/profile");
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (loading && !userDetails) {
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
        <div className="flex items-center justify-center h-64">
          <div className="text-slate-500">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/profile")}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
              Edit Profile
            </h1>
            <p className="text-slate-500 text-sm">
              Update your personal information and professional details.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Contact Email
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="john@example.com"
              />
            </div>
          </div>
        </div>

        {/* Professional Links */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Professional Links
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                GitHub Profile
              </label>
              <input
                type="url"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://github.com/username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                LinkedIn Profile
              </label>
              <input
                type="url"
                name="linkedinLink"
                value={formData.linkedinLink}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Portfolio Website
              </label>
              <input
                type="url"
                name="portfolioLink"
                value={formData.portfolioLink}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://yourportfolio.com"
              />
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Tech Stack</h2>

          <div className="space-y-4">
            {formData.techStack.map((tech, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl"
              >
                <div className="flex-1">
                  <div className="font-medium text-slate-900">{tech.name}</div>
                  <div className="text-sm text-slate-500">
                    {tech.level} • {tech.yearsOfExperience}{" "}
                    {tech.yearsOfExperience === 1 ? "year" : "years"} experience
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveTech(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

            <div className="flex gap-4 p-4 border border-dashed border-slate-200 rounded-xl">
              <input
                type="text"
                value={newTech.name}
                onChange={(e) =>
                  setNewTech((prev) => ({ ...prev, name: e.target.value }))
                }
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Technology name"
              />

              <select
                value={newTech.level}
                onChange={(e) =>
                  setNewTech((prev) => ({
                    ...prev,
                    level: e.target.value as any,
                  }))
                }
                className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>

              <input
                type="number"
                min="1"
                max="50"
                value={newTech.yearsOfExperience}
                onChange={(e) =>
                  setNewTech((prev) => ({
                    ...prev,
                    yearsOfExperience: parseInt(e.target.value) || 1,
                  }))
                }
                className="w-20 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Years"
              />

              <button
                type="button"
                onClick={handleAddTech}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus size={16} />
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Resume Upload */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Resume</h2>

          <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
              className="hidden"
              id="resume-upload"
            />
            <label
              htmlFor="resume-upload"
              className="cursor-pointer flex flex-col items-center gap-4"
            >
              <div className="p-4 bg-blue-50 text-blue-600 rounded-full">
                <Upload size={24} />
              </div>
              <div>
                <div className="font-medium text-slate-900">
                  {resumeFile ? resumeFile.name : "Upload your resume"}
                </div>
                <div className="text-sm text-slate-500">
                  PDF files only (Max 10MB)
                </div>
              </div>
            </label>
          </div>

          {userDetails?.resume?.resumeLink && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="text-sm text-green-700">
                ✓ Resume already uploaded. Uploading a new file will replace the
                existing one.
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="px-6 py-3 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
