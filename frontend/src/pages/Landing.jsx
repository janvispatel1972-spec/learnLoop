import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  BookOpen, Users, Sparkles, TrendingUp,
  Bot, Coins, Trophy, ArrowRight, Zap, Star,
} from "lucide-react";
import logo from "../assets/learnloop_logo.png";
import AuthModal from "../components/AuthModal";

function Landing({ initialAuth }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine initial mode from prop or path
  const getInitialState = () => {
    if (initialAuth === "login" || location.pathname === "/login") {
      return { isOpen: true, mode: "login" };
    }
    if (initialAuth === "register" || location.pathname === "/register") {
      return { isOpen: true, mode: "register" };
    }
    return { isOpen: false, mode: "login" };
  };

  const [authModal, setAuthModal] = useState(getInitialState);

  useEffect(() => {
    if (initialAuth || location.pathname === "/login" || location.pathname === "/register") {
      setAuthModal({
        isOpen: true,
        mode: initialAuth === "register" || location.pathname === "/register" ? "register" : "login",
      });
    }
  }, [initialAuth, location.pathname]);

  const handleCloseModal = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: false }));
    if (location.pathname === "/login" || location.pathname === "/register") {
      navigate("/", { replace: true });
    }
  };

  const openAuth = (mode) => {
    setAuthModal({ isOpen: true, mode });
  };

  const features = [
    { icon: BookOpen, title: "Learn Modules", desc: "Structured courses from expert tutors.", color: "bg-violet-100 text-violet-600" },
    { icon: Coins, title: "Earn Credits", desc: "Quiz scores, resources and community help.", color: "bg-amber-100 text-amber-600" },
    { icon: Bot, title: "AI Assistant", desc: "Instant answers and smart study tips.", color: "bg-cyan-100 text-cyan-600" },
    { icon: Users, title: "Community", desc: "Collaborate and grow together.", color: "bg-emerald-100 text-emerald-600" },
  ];

  return (
    <div className="min-h-screen page-bg">
      <div className="fixed top-20 left-10 w-72 h-72 bg-violet-300/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed top-40 right-20 w-96 h-96 bg-cyan-300/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-10 max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="LearnLoop Logo" className="h-10 w-auto object-contain" />
          <div>
            <span className="text-xl font-bold text-slate-900">LearnLoop</span>
            <p className="text-[11px] text-slate-500">Learn • Share • Earn • Grow</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => openAuth("login")}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-violet-600 transition"
          >
            Login
          </button>
          <button
            onClick={() => openAuth("register")}
            className="btn-primary px-5 py-2.5 text-sm font-semibold text-white rounded-xl shadow-md shadow-violet-500/20 hover:shadow-lg transition"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          AI-Powered Credit-Based Learning
        </div>

        <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-tight max-w-4xl mx-auto">
          Learn Smarter, <span className="text-gradient">Earn While You Grow</span>
        </h1>
        <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
          Earn credits through quizzes, sharing resources, and community help — redeem them for AI tools and premium content.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => openAuth("register")}
            className="btn-primary px-8 py-4 text-white font-semibold rounded-2xl flex items-center gap-2 shadow-lg shadow-violet-500/25 hover:shadow-xl transition"
          >
            Start Learning Free <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => openAuth("login")}
            className="px-8 py-4 card text-slate-700 font-semibold rounded-2xl hover:shadow-md transition"
          >
            Sign In
          </button>
        </div>

        {/* Preview card */}
        <div className="mt-16 mx-auto max-w-3xl card rounded-3xl p-6 sm:p-8">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Credits", value: "240", icon: Coins },
              { label: "Streak", value: "7 days", icon: Zap },
              { label: "Rank", value: "#12", icon: Star },
            ].map((item) => (
              <div key={item.label} className="bg-violet-50 rounded-2xl p-4 text-left">
                <item.icon className="w-5 h-5 text-violet-600 mb-2" />
                <p className="text-2xl font-bold text-slate-900">{item.value}</p>
                <p className="text-xs text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-2">Everything You Need</h2>
        <p className="text-slate-500 text-center mb-10">Built for learners, tutors and admins</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((item) => (
            <div key={item.title} className="card rounded-2xl p-6 hover:shadow-lg transition">
              <div className={`h-12 w-12 rounded-2xl ${item.color} flex items-center justify-center mb-4`}>
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-800">{item.title}</h3>
              <p className="text-sm text-slate-500 mt-1.5">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      {/* <section className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "Active Learners", value: "500+" },
            { icon: BookOpen, label: "Courses", value: "50+" },
            { icon: Trophy, label: "Badges Earned", value: "1,200+" },
            { icon: TrendingUp, label: "Credits Redeemed", value: "8,000+" },
          ].map((stat) => (
            <div key={stat.label} className="stat-card rounded-2xl p-6 text-center">
              <stat.icon className="w-6 h-6 text-violet-600 mx-auto mb-2" />
              <p className="text-3xl font-extrabold text-gradient">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* CTA */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-12 text-center text-white shadow-xl shadow-violet-500/20">
          <h2 className="text-3xl font-extrabold">Ready to Level Up?</h2>
          <p className="mt-2 text-violet-100">Join thousands of learners on LearnLoop today.</p>
          <button
            onClick={() => openAuth("register")}
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-white text-violet-700 font-bold rounded-2xl hover:bg-violet-50 transition shadow-lg"
          >
            Create Free Account <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <footer className="relative z-10 border-t border-violet-100 py-8 text-center text-sm text-slate-400">
        <p>© {new Date().getFullYear()} LearnLoop. All rights reserved.</p>
      </footer>

      {/* Auth Modal Popup */}
      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default Landing;
