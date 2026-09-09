import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, BookOpen, FileText, HelpCircle,
  MessageSquare, Bot, User, Users, BarChart3, Settings,
} from "lucide-react";
import logo from "../assets/learnloop_logo.png";

const menuItems = {
  learner: [
    { label: "Dashboard", path: "/learner/dashboard", icon: LayoutDashboard },
    { label: "Courses", path: "#", icon: BookOpen },
    { label: "Resources", path: "#", icon: FileText },
    { label: "Quizzes", path: "#", icon: HelpCircle },
    { label: "Community", path: "#", icon: MessageSquare },
    { label: "AI Assistant", path: "#", icon: Bot },
    { label: "Profile", path: "#", icon: User },
  ],
  tutor: [
    { label: "Dashboard", path: "/tutor/dashboard", icon: LayoutDashboard },
    { label: "My Courses", path: "#", icon: BookOpen },
    { label: "Quizzes", path: "#", icon: HelpCircle },
    { label: "Community", path: "#", icon: MessageSquare },
    { label: "Profile", path: "#", icon: User },
  ],
  admin: [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Users", path: "#", icon: Users },
    { label: "Reports", path: "#", icon: BarChart3 },
    { label: "Settings", path: "#", icon: Settings },
  ],
};

function Sidebar({ role }) {
  const location = useLocation();
  const items = menuItems[role] || menuItems.learner;

  return (
    <aside className="w-64 min-h-screen flex flex-col bg-white border-r border-violet-100">
      <div className="p-5 border-b border-violet-100">
        <div className="flex items-center gap-3">
          <img src={logo} alt="LearnLoop Logo" className="h-9 w-auto object-contain" />
          <div>
            <p className="font-bold text-slate-900 text-sm leading-tight">LearnLoop</p>
            <p className="text-[10px] text-slate-400 capitalize">{role} panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {items.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                active
                  ? "bg-violet-50 text-violet-700 border border-violet-100"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <item.icon className={`w-4 h-4 ${active ? "text-violet-600" : ""}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-violet-100">
        <div className="bg-violet-50 rounded-xl p-3 text-center border border-violet-100">
          <p className="text-xs text-slate-500">Credits Balance</p>
          <p className="text-lg font-bold text-gradient">240</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
