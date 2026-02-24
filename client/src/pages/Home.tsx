import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      
      {/* 1. NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">R</div>
            <span className="font-bold tracking-tight text-xl text-slate-900">ResuSend</span>
          </div>
          
     
  
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
              Sign in
            </Link>
            <Link to="/register" className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm">
              Start for free
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-44 pb-32 px-6 overflow-hidden">
        {/* Subtle Background Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full max-w-6xl h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            Now supporting 1-click LinkedIn imports
          </div>
          
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-slate-950 leading-[1.1] mb-8">
            The intelligent way to <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">land your next role.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed mb-12">
            ResuSend streamlines your job search with automated outreach, real-time document tracking, and AI-driven application optimization.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              Get Started for Free
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-lg hover:bg-slate-50 transition-all">
Get Demo            </button>
          </div>

          <div className="mt-16 flex items-center justify-center gap-8 opacity-40 grayscale">
            <span className="font-bold text-xl uppercase tracking-tighter">Goldman Sachs</span>
            <span className="font-bold text-xl uppercase tracking-tighter">Stripe</span>
            <span className="font-bold text-xl uppercase tracking-tighter">Vercel</span>
            <span className="font-bold text-xl uppercase tracking-tighter">Meta</span>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT PREVIEW / DATA SECTION */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Data-driven outreach <br />that gets noticed.
              </h2>
              <div className="space-y-8">
                {[
                  { t: "Automated Follow-ups", d: "Set intelligent sequences that trigger follow-ups based on recipient engagement." },
                  { t: "ATS Optimization", d: "Our engine scans job descriptions to ensure your resume passes every automated filter." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.t}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-white rounded-2xl border border-slate-200 shadow-2xl p-4 overflow-hidden">
                <div className="flex gap-2 mb-4">
                  <div className="h-3 w-3 rounded-full bg-slate-100" />
                  <div className="h-3 w-3 rounded-full bg-slate-100" />
                  <div className="h-3 w-3 rounded-full bg-slate-100" />
                </div>
                <div className="space-y-3">
                  <div className="h-4 w-3/4 bg-slate-50 rounded" />
                  <div className="h-4 w-1/2 bg-slate-50 rounded" />
                  <div className="h-32 w-full bg-blue-50/50 rounded-xl border border-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-sm font-semibold tracking-wide">Dynamic Activity Feed</span>
                  </div>
                </div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100">
                <div className="text-xs text-slate-500 font-medium">Average Response Rate</div>
                <div className="text-2xl font-bold text-green-600">+42%</div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 4. TESTIMONIALS SECTION */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Trusted by professionals worldwide.
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              See how ResuSend users are transforming their job search and landing 
              offers at their dream companies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "ResuSend's ATS optimization was a game-changer. I went from zero callbacks to three interviews in one week.",
                author: "Sarah Jenkins",
                role: "Product Designer",
                company: "Stripe",
                avatar: "SJ"
              },
              {
                quote: "The automated follow-up sequences saved me hours of manual work. It's like having a personal career assistant.",
                author: "Marcus Chen",
                role: "Software Engineer",
                company: "Vercel",
                avatar: "MC"
              },
              {
                quote: "The interface is beautiful and the data insights are incredibly helpful. I finally feel in control of my job search.",
                author: "Elena Rodriguez",
                role: "Marketing Manager",
                company: "Meta",
                avatar: "ER"
              }
            ].map((testimonial, i) => (
              <div key={i} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-700 italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{testimonial.author}</div>
                    <div className="text-slate-500 text-xs">{testimonial.role} @ {testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-6 w-6 rounded bg-slate-900 flex items-center justify-center text-white text-[10px] font-bold">R</div>
              <span className="font-bold tracking-tight text-lg text-slate-900">ResuSend</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              ResuSend is the world's most advanced career acceleration platform, helping thousands of professionals land roles at top-tier companies.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-slate-900 text-sm mb-4">Product</h5>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><button className="hover:text-blue-600">Features</button></li>
              <li><button className="hover:text-blue-600">Integrations</button></li>
              <li><button className="hover:text-blue-600">Security</button></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-slate-900 text-sm mb-4">Company</h5>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><button className="hover:text-blue-600">About Us</button></li>
              <li><button className="hover:text-blue-600">Privacy Policy</button></li>
              <li><button className="hover:text-blue-600">Terms of Service</button></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-50 text-center">
          <p className="text-xs text-slate-400">© 2026 ResuSend Technologies Inc. Built for the modern job market.</p>
        </div>
      </footer>
    </div>
  );
}
