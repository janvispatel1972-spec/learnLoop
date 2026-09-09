import { useNavigate } from "react-router-dom";
import { Bell, LogOut, Menu, Search } from "lucide-react";
import logo from "../assets/learnloop_logo.png";

function Navbar({ user, onMenuClick }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-violet-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="md:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-600">
          <Menu className="w-5 h-5" />
        </button>
        <div className="md:hidden flex items-center gap-2">
          <img src={logo} alt="LearnLoop" className="h-8 w-8 object-contain rounded-lg" />
          <span className="font-bold text-slate-800 text-sm">LearnLoop</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 w-64">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search..." className="bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none w-full" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <p className="hidden md:block text-sm text-slate-500">
          Hi, <span className="font-semibold text-slate-800">{user?.name}</span>
        </p>
        <button className="relative p-2.5 rounded-xl hover:bg-slate-50 text-slate-500">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-violet-500 rounded-full" />
        </button>
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-sm font-bold text-white">
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <button onClick={handleLogout} className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition">
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
