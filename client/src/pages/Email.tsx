import React, { useEffect, useState } from "react";
import {
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Mail,
  Briefcase,
  GraduationCap,
  Target,
  Save,
} from "lucide-react";
import { useEmailStore } from "../store/useEmail";

interface ScoreBreakdown {
  keywordMatch: number;
  experienceRelevance: number;
  educationMatch: number;
  clarity: number;
}

interface EmailResponse {
  subject: string;
  emailBody: string;
  interviewChance: number;
  matchingSkills: string[];
  missingSkills: string[];
  atsScore: number;
  aiRecommendation: string;
  scoreBreakdown: ScoreBreakdown;
}

export default function Email() {
  const {
    generateEmail,
    generatedSubject,
    loading,
    setGenerateEmail,
    sendEmail,
    serverResponse,
    applicationId,
    postDraftEmail,
    getDraftEmail,
  } = useEmailStore();

  const [companyEmail, setCompanyEmail] = useState("");
  const [role, setRole] = useState("");
  const [linkedinPost, setLinkedinPost] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getDraftEmail();
  }, []);

  useEffect(() => {
    if (generateEmail) setContent(generateEmail);
    if (generatedSubject) setSubject(generatedSubject);
  }, [generateEmail, generatedSubject]);

  const handleAIAssist = async () => {
    if (!companyEmail || !role || !linkedinPost) {
      return alert(
        "Please provide Company Email, Role, and paste LinkedIn Post",
      );
    }
    await setGenerateEmail({
      targetedEmail: companyEmail,
      targetedPost: linkedinPost,
      targetedRole: role,
    });
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyEmail || !subject || !content) return;

    await sendEmail({
      email: companyEmail,
      subject,
      message: content,
    });

    setCompanyEmail("");
    setRole("");
    setLinkedinPost("");
    setSubject("");
    setContent("");
  };

  const handleSaveAsDraft = async () => {
    if (!applicationId) {
      alert("No application to save. Please generate an email first.");
      return;
    }
    await postDraftEmail({ applicationId });
  };

  const isBusy = loading;
  const response: EmailResponse | null = serverResponse;

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen bg-slate-50/50">
      <div className="mb-8 text-center lg:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
          Smart <span className="text-blue-600">Apply</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Craft high-impact job applications backed by AI analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* === Left Column: Form === */}
        <div className="lg:col-span-7 space-y-6">
          <form
            className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/50 space-y-6"
            onSubmit={handleSend}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  Company Email
                </label>
                <input
                  type="email"
                  required
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                  placeholder="hr@company.com"
                  className="w-full text-black outline-none border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/50"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  Preferred Role
                </label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full text-black outline-none border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/50"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                Job Description
              </label>
              <textarea
                value={linkedinPost}
                onChange={(e) => setLinkedinPost(e.target.value)}
                placeholder="Paste the LinkedIn job post details here..."
                className="w-full text-black resize-none h-32 border border-slate-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/50"
              />
            </div>

            <button
              type="button"
              onClick={handleAIAssist}
              disabled={isBusy}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              <Sparkles
                size={18}
                className={
                  isBusy ? "animate-spin text-blue-400" : "text-blue-400"
                }
              />
              {isBusy
                ? "Analyzing Requirements..."
                : "Generate AI Optimized Email"}
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-100"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400 font-medium">
                  Draft Editor
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Email subject line"
                  className="w-full text-black outline-none border border-slate-200 rounded-xl px-4 py-2.5 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  Email Content
                </label>
                <textarea
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="The generated email will appear here..."
                  className="w-full text-black resize-none h-64 border border-slate-200 rounded-xl p-4 outline-none focus:border-blue-500 transition-all font-serif text-lg leading-relaxed"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSaveAsDraft}
                disabled={isBusy || !content || !applicationId}
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-600 hover:bg-slate-700 text-white font-bold rounded-xl shadow-lg shadow-slate-200 transition-all active:scale-[0.99] disabled:grayscale disabled:opacity-50"
              >
                <Save size={18} />
                Save as Draft
              </button>

              <button
                type="submit"
                disabled={isBusy || !content}
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.99] disabled:grayscale disabled:opacity-50"
              >
                <Send size={18} />
                Send Application
              </button>
            </div>
          </form>
        </div>

        {/* === Right Column: AI Insights === */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-6">
          {!response ? (
            <div className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-3xl p-12 text-center">
              <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <BarChart3 className="text-blue-500" size={32} />
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                Ready to Analyze
              </h3>
              <p className="text-blue-700/70 text-sm">
                Fill in the job details and click "AI Assist" to see your
                interview probability and ATS compatibility.
              </p>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 animate-in zoom-in-95 duration-300">
              <div className="bg-slate-900 p-6 text-white">
                <div className="flex items-center gap-2 mb-4 opacity-80 uppercase tracking-widest text-xs font-bold">
                  <Target size={14} /> AI Analysis Engine
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-black text-blue-400">
                      {response.atsScore}%
                    </div>
                    <div className="text-sm text-slate-400">
                      ATS Match Score
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-emerald-400">
                      {response.interviewChance}%
                    </div>
                    <div className="text-sm text-slate-400">
                      Interview Probability
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Score Breakdown Bars */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-tight">
                    <BarChart3 size={16} /> Score Breakdown
                  </h4>
                  {[
                    {
                      label: "Keywords",
                      val: response?.scoreBreakdown?.keywordMatch || 0,
                      icon: <Sparkles size={14} />,
                    },
                    {
                      label: "Experience",
                      val: response?.scoreBreakdown?.experienceRelevance || 0,
                      icon: <Briefcase size={14} />,
                    },
                    {
                      label: "Education",
                      val: response?.scoreBreakdown?.educationMatch || 0,
                      icon: <GraduationCap size={14} />,
                    },
                    {
                      label: "Clarity",
                      val: response?.scoreBreakdown?.clarity || 0,
                      icon: <Mail size={14} />,
                    },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-500 flex items-center gap-1">
                          {item.icon} {item.label}
                        </span>
                        <span className="font-bold text-slate-700">
                          {item.val}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${item.val}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <hr className="border-slate-100" />

                {/* Skills Tags */}
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-500" />{" "}
                      Matching Strengths
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {response?.matchingSkills?.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-100"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <AlertCircle size={16} className="text-amber-500" />{" "}
                      Missing in Profile
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {response?.missingSkills?.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-100"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Recommendation */}
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                  <p className="text-xs font-bold text-blue-800 uppercase mb-1">
                    Strategic Advice
                  </p>
                  <p className="text-sm text-blue-900/80 italic leading-relaxed">
                    "{response.aiRecommendation}"
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
