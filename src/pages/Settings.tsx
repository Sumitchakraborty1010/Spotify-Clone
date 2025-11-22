import { useState, useEffect } from "react";
import { User as UserIcon, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getUser, updateUser, generateAvatar, getTimeSpent } from "@/lib/storage";
import { toast } from "sonner";

const Settings = () => {
  const user = getUser();
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [genre, setGenre] = useState(user?.genre || "");
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(getTimeSpent());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!user) return null;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const handleSave = () => {
    updateUser({ username, email, genre });
    toast.success("Profile updated successfully!");
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-8 backdrop-blur-sm">
          <h1 className="text-5xl font-bold mb-2 slide-in-left">Profile Settings</h1>
          <p className="text-xl text-muted-foreground slide-in-left">
            Manage your account and preferences
          </p>
        </div>

        <div className="max-w-2xl space-y-6">
          {/* Avatar */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-6">
              <img
                src={generateAvatar(user.username)}
                alt={user.username}
                className="w-24 h-24 rounded-full border-4 border-primary"
              />
              <div>
                <h2 className="text-2xl font-bold">{user.username}</h2>
                <p className="text-muted-foreground">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Time Stats */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">Listening Time</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-primary">{formatTime(timeSpent)}</span>
              <span className="text-muted-foreground">total</span>
            </div>
          </div>

          {/* Profile Form */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <UserIcon className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">Account Information</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="genre">Favorite Genre</Label>
                <Select value={genre} onValueChange={setGenre}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue />
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
                onClick={handleSave}
                className="w-full bg-primary hover:bg-primary-hover glow-button"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
