import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight, ArrowLeft, Copy, CheckCircle2 } from "lucide-react";
import logo from "../../assets/learnloop_logo.png";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resetUrl, setResetUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setResetUrl("");

    if (!email.trim()) { setError("Email is required"); return; }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Request failed");
      setSuccess(data.message);
      if (data.resetUrl) setResetUrl(data.resetUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(resetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const token = resetUrl ? resetUrl.split("token=")[1] : "";

  return (
    <div className="min-h-screen page-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 mb-8 justify-center">
          <img src={logo} alt="LearnLoop Logo" className="h-9 w-auto object-contain" />
          <span className="text-xl font-bold text-slate-900">LearnLoop</span>
        </Link>

        <div className="card rounded-3xl p-8">
          <h1 className="text-2xl font-bold text-slate-900">Forgot Password</h1>
          <p className="text-sm text-slate-500 mt-1 mb-6">Enter your email to get a password reset link</p>

          {error && <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-sm">{error}</div>}

          {success && (
            <div className="mb-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4" /> {success}
              </div>
              {resetUrl && (
                <div className="mt-3 space-y-2">
                  <Link
                    to={`/reset-password?token=${token}`}
                    className="block text-center py-2.5 bg-violet-600 text-white text-sm font-semibold rounded-xl hover:bg-violet-700 transition"
                  >
                    Open Reset Password Page
                  </Link>
                  <button
                    type="button"
                    onClick={copyLink}
                    className="w-full flex items-center justify-center gap-2 py-2 text-xs text-violet-600 border border-violet-200 rounded-lg hover:bg-violet-50"
                  >
                    {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied!" : "Copy reset link"}
                  </button>
                </div>
              )}
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
                  placeholder="learner@learnloop.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/15"
                />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full btn-primary py-3.5 text-white font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Send Reset Link <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <Link to="/login" className="mt-6 flex items-center justify-center gap-1 text-sm text-violet-600 hover:text-violet-700">
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
