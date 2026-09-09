import { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  Users, BookOpen, Coins, Activity, Shield,
  CheckCircle, XCircle, Clock, RefreshCw, UserCheck
} from "lucide-react";

function AdminDashboard() {
  const stats = [
    { label: "Total Users",    value: "520",  icon: Users,    color: "bg-violet-100 text-violet-600" },
    { label: "Active Courses", value: "48",   icon: BookOpen, color: "bg-cyan-100 text-cyan-600"   },
    { label: "Credits Issued", value: "12.4K",icon: Coins,    color: "bg-amber-100 text-amber-600" },
    { label: "Activity Logs",  value: "3.8K", icon: Activity, color: "bg-emerald-100 text-emerald-600" },
  ];

  const [pendingTutors, setPendingTutors] = useState([]);
  const [loadingTutors, setLoadingTutors] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // id of tutor being actioned

  const token = localStorage.getItem("token");

  const fetchPendingTutors = async () => {
    setLoadingTutors(true);
    try {
      const res = await fetch("http://localhost:5000/api/admin/tutors/pending", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setPendingTutors(data.tutors);
    } catch (err) {
      console.error("Failed to fetch pending tutors:", err);
    } finally {
      setLoadingTutors(false);
    }
  };

  useEffect(() => {
    fetchPendingTutors();
  }, []);

  const handleApprove = async (id) => {
    setActionLoading(id + "_approve");
    try {
      const res = await fetch(`http://localhost:5000/api/admin/tutors/${id}/approve`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setPendingTutors((prev) => prev.filter((t) => t._id !== id));
      }
    } catch (err) {
      console.error("Approve failed:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    setActionLoading(id + "_reject");
    try {
      const res = await fetch(`http://localhost:5000/api/admin/tutors/${id}/reject`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setPendingTutors((prev) => prev.filter((t) => t._id !== id));
      }
    } catch (err) {
      console.error("Reject failed:", err);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-5 h-5 text-violet-600" />
            <span className="text-xs font-semibold text-violet-600 uppercase tracking-wider">Admin</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Control Panel</h1>
          <p className="text-slate-500 text-sm mt-1">Platform overview and management</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card rounded-2xl p-5 shadow-lg border border-slate-200">
              <div className={`h-10 w-10 rounded-xl ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <p className="text-3xl font-extrabold text-gradient">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tutor Approval Panel */}
        <div className="mt-6 card rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-violet-600" />
              <h2 className="font-bold text-slate-800">Tutor Approval Requests</h2>
              {pendingTutors.length > 0 && (
                <span className="ml-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">
                  {pendingTutors.length} pending
                </span>
              )}
            </div>
            <button
              onClick={fetchPendingTutors}
              className="p-2 rounded-xl text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loadingTutors ? "animate-spin" : ""}`} />
            </button>
          </div>

          {loadingTutors ? (
            <div className="flex items-center justify-center py-10 text-slate-400">
              <RefreshCw className="w-5 h-5 animate-spin mr-2" />
              <span className="text-sm">Loading pending tutors…</span>
            </div>
          ) : pendingTutors.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-slate-400">
              <CheckCircle className="w-10 h-10 mb-2 text-emerald-300" />
              <p className="text-sm font-medium">No pending tutor applications</p>
              <p className="text-xs mt-1">All tutor accounts are up to date</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingTutors.map((tutor) => (
                <div
                  key={tutor._id}
                  className="flex items-center justify-between p-4 rounded-xl bg-amber-50 border border-amber-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-amber-100 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{tutor.name}</p>
                      <p className="text-xs text-slate-500">{tutor.email}</p>
                      <p className="text-[11px] text-amber-600 font-medium mt-0.5">
                        Applied {new Date(tutor.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApprove(tutor._id)}
                      disabled={!!actionLoading}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold transition disabled:opacity-60"
                    >
                      {actionLoading === tutor._id + "_approve" ? (
                        <span className="inline-block h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <CheckCircle className="w-3.5 h-3.5" />
                      )}
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(tutor._id)}
                      disabled={!!actionLoading}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-semibold transition disabled:opacity-60"
                    >
                      {actionLoading === tutor._id + "_reject" ? (
                        <span className="inline-block h-3 w-3 border-2 border-rose-600 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5" />
                      )}
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom row */}
        <div className="grid lg:grid-cols-2 gap-5 mt-5">
          <div className="card rounded-2xl p-6">
            <h2 className="font-bold text-slate-800 mb-5">Recent Activity</h2>
            <div className="space-y-2">
              {[
                { user: "Alex Johnson", action: "Earned 20 credits",      time: "2m ago"  },
                { user: "Riya Patel",   action: "Registered as learner",  time: "15m ago" },
                { user: "Dr. Sharma",   action: "Created new quiz",        time: "1h ago"  },
                { user: "Admin",        action: "Updated settings",        time: "3h ago"  },
              ].map((log) => (
                <div key={log.user + log.time} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{log.user}</p>
                    <p className="text-xs text-slate-500">{log.action}</p>
                  </div>
                  <span className="text-[11px] text-slate-400">{log.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card rounded-2xl p-6">
            <h2 className="font-bold text-slate-800 mb-5">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {["Manage Users", "View Reports", "Credit Settings", "System Logs"].map((action) => (
                <button key={action} className="p-5 text-sm font-semibold text-slate-600 rounded-xl bg-slate-50 border border-slate-100 hover:border-violet-200 hover:text-violet-700 hover:bg-violet-50 transition">
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;
