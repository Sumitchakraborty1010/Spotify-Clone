import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { saveUser, startTimeTracking } from "@/lib/storage";
import { toast } from "sonner";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!genre) {
      toast.error("Please select your favorite genre");
      return;
    }

    setLoading(true);

    try {
      const newUser = {
        username,
        email,
        password,
        genre,
        timeSpent: 0,
        createdAt: new Date().toISOString(),
      };

      const savedUser = await saveUser(newUser);
      if (savedUser) {
        startTimeTracking();
        toast.success("Account created successfully!");
        navigate("/");
      } else {
        toast.error("Failed to create account. Email may already be in use.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An error occurred during signup. Please try again.");
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
          <p className="text-muted-foreground">Create your account and start listening</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="genre">Favorite Genre</Label>
            <Select value={genre} onValueChange={setGenre}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select your favorite genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronic">Electronic</SelectItem>
                <SelectItem value="rock">Rock</SelectItem>
                <SelectItem value="pop">Pop</SelectItem>
                <SelectItem value="hiphop">Hip-Hop</SelectItem>
                <SelectItem value="jazz">Jazz</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full glow-button bg-primary hover:bg-primary-hover text-primary-foreground"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:text-primary-light transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;