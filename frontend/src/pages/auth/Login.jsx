import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import logo from "../../assets/learnloop_logo.png";

const demoAccounts = [
  { role: "Learner", email: "learner@learnloop.com", password: "password123" },
  { role: "Tutor", email: "tutor@learnloop.com", password: "password123" },
  { role: "Admin", email: "admin@learnloop.com", password: "password123" },
];

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fillDemo = (account) => {
    setEmail(account.email);
    setPassword(account.password);
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Email and password are required");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const role = data.user?.role || "learner";
      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "tutor") navigate("/tutor/dashboard");
      else navigate("/learner/dashboard");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen page-bg flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        <div className="absolute top-20 left-20 w-64 h-64 bg-violet-300/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-300/20 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <img src={logo} alt="LearnLoop Logo" className="h-11 w-auto object-contain" />
            <span className="text-2xl font-bold text-slate-900">LearnLoop</span>
          </div>

          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
            Welcome back to your{" "}
            <span className="text-gradient">learning journey</span>
          </h1>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Access your courses, track credits, and pick up right where you left off.
          </p>

          <div className="mt-10 flex items-center gap-3 card rounded-2xl p-4">
            <Sparkles className="w-5 h-5 text-violet-600 shrink-0" />
            <p className="text-sm text-slate-600">
              Earn credits with every quiz, resource share and community answer.
            </p>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <img src={logo} alt="LearnLoop Logo" className="h-9 w-auto object-contain" />
            <span className="text-xl font-bold text-slate-900">LearnLoop</span>
          </div>

          <div className="card rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-slate-900">Sign In</h2>
            <p className="text-sm text-slate-500 mt-1 mb-6">Enter your credentials to continue</p>

            {errorMessage && (
              <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-sm">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/15 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-12 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/15 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-xs font-medium text-violet-600 hover:text-violet-700">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-3.5 text-white font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Sign In <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 p-4 rounded-xl bg-violet-50 border border-violet-100">
              <p className="text-xs font-semibold text-violet-700 mb-2">Demo Accounts (click to fill)</p>
              <div className="space-y-1.5">
                {demoAccounts.map((acc) => (
                  <button
                    key={acc.role}
                    type="button"
                    onClick={() => fillDemo(acc)}
                    className="w-full text-left text-xs px-3 py-2 rounded-lg bg-white border border-violet-100 hover:border-violet-300 transition"
                  >
                    <span className="font-semibold text-slate-800">{acc.role}:</span>{" "}
                    <span className="text-slate-500">{acc.email} / {acc.password}</span>
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-5 text-center text-sm text-slate-500">
              No account?{" "}
              <Link to="/register" className="text-violet-600 font-semibold hover:text-violet-700">
                Create one
              </Link>
            </p>
          </div>

          <Link to="/" className="block text-center text-xs text-slate-400 mt-6 hover:text-slate-600">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
