import DashboardLayout from "../../layouts/DashboardLayout";
import { BookOpen, Users, HelpCircle, MessageSquare, Plus } from "lucide-react";

function TutorDashboard() {
  const stats = [
    { label: "My Courses", value: "6", icon: BookOpen, color: "bg-violet-100 text-violet-600" },
    { label: "Students", value: "128", icon: Users, color: "bg-cyan-100 text-cyan-600" },
    { label: "Quizzes", value: "12", icon: HelpCircle, color: "bg-amber-100 text-amber-600" },
    { label: "Discussions", value: "34", icon: MessageSquare, color: "bg-emerald-100 text-emerald-600" },
  ];

  const courses = [
    { name: "Introduction to Python", students: 45, status: "Active" },
    { name: "Database Management", students: 32, status: "Active" },
    { name: "Web Development Basics", students: 51, status: "Draft" },
  ];

  return (
    <DashboardLayout role="tutor">
      <div className="max-w-6xl">
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-xs font-semibold text-cyan-600 uppercase tracking-wider mb-1">Tutor</p>
            <h1 className="text-3xl font-extrabold text-slate-900">Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Manage courses and track student progress</p>
          </div>
          <button className="btn-primary px-5 py-2.5 text-sm font-semibold text-white rounded-xl flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Course
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card rounded-2xl p-5">
              <div className={`h-10 w-10 rounded-xl ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <p className="text-3xl font-extrabold text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="card rounded-2xl p-6 mt-6">
          <h2 className="font-bold text-slate-800 mb-5">My Courses</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-100">
                <th className="pb-4 font-medium">Course</th>
                <th className="pb-4 font-medium">Students</th>
                <th className="pb-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.name} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="py-4 font-semibold text-slate-800">{course.name}</td>
                  <td className="py-4 text-slate-500">{course.students}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      course.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                    }`}>{course.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default TutorDashboard;
