import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { findUser, startTimeTracking } from "@/lib/storage";
import { toast } from "sonner";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log(`Attempting login with username: ${username}`);

    try {
      const user = await findUser(username);
      console.log("User lookup result:", user);
      
      if (user && user.password === password) {
        console.log("Login successful");
        startTimeTracking();
        toast.success("Welcome back!");
        navigate("/");
      } else {
        console.log("Invalid username or password");
        toast.error("Invalid username or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 animated-gradient">
      <div className="w-full max-w-md glass rounded-2xl p-8 fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Music className="w-12 h-12 text-primary" />
            <h1 className="text-4xl font-bold">SoundWave</h1>
          </div>
          <p className="text-muted-foreground">Sign in to continue your journey</p>
          <p className="text-sm text-muted-foreground mt-2">
            Default accounts: user/user123 or admin/admin123
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-background/50"
            />
          </div>

          <Button
            type="submit"
            className="w-full glow-button bg-primary hover:bg-primary-hover text-primary-foreground"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:text-primary-light transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;