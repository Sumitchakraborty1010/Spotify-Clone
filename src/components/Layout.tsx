import { Home, Music, User, Radio, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useNavigate } from "react-router-dom";
import { clearUser, saveTimeSpent } from "@/lib/storage";
import { toast } from "sonner";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    saveTimeSpent();
    clearUser();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border fixed h-full flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Music className="w-8 h-8" />
            SoundWave
          </h1>
        </div>

        <nav className="flex-1 px-3">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors mb-2"
            activeClassName="bg-sidebar-accent text-foreground"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Discover</span>
          </NavLink>

          <NavLink
            to="/playlists"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors mb-2"
            activeClassName="bg-sidebar-accent text-foreground"
          >
            <Music className="w-5 h-5" />
            <span className="font-medium">My Playlists</span>
          </NavLink>

          <NavLink
            to="/visualizer"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors mb-2"
            activeClassName="bg-sidebar-accent text-foreground"
          >
            <Radio className="w-5 h-5" />
            <span className="font-medium">Visualizer</span>
          </NavLink>

          <NavLink
            to="/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors mb-2"
            activeClassName="bg-sidebar-accent text-foreground"
          >
            <User className="w-5 h-5" />
            <span className="font-medium">Profile</span>
          </NavLink>
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-destructive transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64">
        {children}
      </main>
    </div>
  );
};

export default Layout;
