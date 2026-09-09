import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react";
import logo from "../../assets/learnloop_logo.png";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!name || !email || !password) { setErrorMessage("All fields are required"); return; }
    if (password.length < 6) { setErrorMessage("Password must be at least 6 characters"); return; }
    if (password !== confirmPassword) { setErrorMessage("Passwords do not match"); return; }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "learner" }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");
      setSuccessMessage("Account created! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/15 transition";

  return (
    <div className="min-h-screen page-bg flex">
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        <div className="absolute top-20 right-20 w-64 h-64 bg-fuchsia-300/25 rounded-full blur-[100px]" />
        <div className="relative z-10 max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <img src={logo} alt="LearnLoop Logo" className="h-11 w-auto object-contain" />
            <span className="text-2xl font-bold text-slate-900">LearnLoop</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
            Start your <span className="text-gradient">learning adventure</span>
          </h1>
          <p className="mt-4 text-slate-600">Join a community that learns, shares and grows together.</p>
          <div className="mt-10 space-y-3">
            {["Free to join", "Earn credits instantly", "AI-powered assistance"].map((text) => (
              <div key={text} className="flex items-center gap-3 text-sm text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <img src={logo} alt="LearnLoop Logo" className="h-9 w-auto object-contain" />
            <span className="text-xl font-bold text-slate-900">LearnLoop</span>
          </div>

          <div className="card rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
            <p className="text-sm text-slate-500 mt-1 mb-6">Join LearnLoop as a learner</p>

            {errorMessage && <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-sm">{errorMessage}</div>}
            {successMessage && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {[
                { label: "Full Name", icon: User, value: name, set: setName, placeholder: "Alex Johnson" },
                { label: "Email", icon: Mail, value: email, set: setEmail, placeholder: "you@example.com", type: "email" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">{f.label}</label>
                  <div className="relative">
                    <f.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type={f.type || "text"} value={f.value} onChange={(e) => f.set(e.target.value)} placeholder={f.placeholder} className={inputClass} />
                  </div>
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters" className={`${inputClass} pr-12`} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repeat password" className={inputClass} />
                </div>
              </div>
              <button type="submit" disabled={isLoading} className="w-full btn-primary py-3.5 text-white font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 mt-2">
                {isLoading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account? <Link to="/login" className="text-violet-600 font-semibold">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
