import DashboardLayout from "../../layouts/DashboardLayout";
import { BookOpen, Coins, Flame, Trophy, ArrowRight, Zap } from "lucide-react";

function LearnerDashboard() {
  const stats = [
    { label: "Credits Earned", value: "240", icon: Coins, color: "bg-amber-100 text-amber-600" },
    { label: "Courses", value: "4", icon: BookOpen, color: "bg-violet-100 text-violet-600" },
    { label: "Day Streak", value: "7", icon: Flame, color: "bg-orange-100 text-orange-600" },
    { label: "Badges", value: "3", icon: Trophy, color: "bg-emerald-100 text-emerald-600" },
  ];

  const courses = [
    { name: "Web Development", progress: 68 },
    { name: "Data Structures", progress: 45 },
    { name: "UI/UX Design", progress: 82 },
  ];

  return (
    <DashboardLayout role="learner">
      <div className="max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Learner</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Your learning progress at a glance</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card rounded-2xl p-5 shadow-lg border border-slate-200 shadow-xl hover:-translate-y-2">
              <div className={`h-10 w-10 rounded-xl ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <p className="text-3xl font-extrabold text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-5 mt-6">
          <div className="card rounded-2xl p-6 shadow-lg border border-slate-200 shadow-xl hover:-translate-y-2">
            <h2 className="font-bold text-slate-800 mb-5">Continue Learning</h2>
            <div className="space-y-3">
              {courses.map((course) => (
                <div key={course.name} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-violet-200 transition group">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800">{course.name}</p>
                    <div className="mt-2 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" style={{ width: `${course.progress}%` }} />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{course.progress}% complete</p>
                  </div>
                  <button className="p-2.5 rounded-xl bg-violet-50 text-violet-600 group-hover:bg-violet-100 transition ml-3">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="card rounded-2xl p-6 shadow-lg border border-slate-200 shadow-xl hover:-translate-y-2">
            <h2 className="font-bold text-slate-800 mb-5">Recent Activity</h2>
            <ul className="space-y-2">
              {["Completed Quiz: JavaScript Basics", "Shared resource: React Notes PDF", "Answered question in Community", "Earned 20 credits for quiz score"].map((item) => (
                <li key={item} className="text-sm text-slate-600 p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-violet-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default LearnerDashboard;
