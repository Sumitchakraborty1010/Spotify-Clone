import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Visualizer3D from "@/components/Visualizer3D";
import { getUser, getTimeSpent } from "@/lib/storage";
import { genreColors } from "@/lib/mockData";

const Visualizer = () => {
  const user = getUser();
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

  const genreColor = genreColors[user.genre] || "141 76% 48%";

  return (
    <Layout>
      <div className="p-8 h-screen flex flex-col">
        <div className="mb-6 glass rounded-2xl p-6">
          <h1 className="text-4xl font-bold mb-2">Visualizer</h1>
          <div className="flex items-center gap-6 text-muted-foreground">
            <p>
              Genre:{" "}
              <span 
                className="font-semibold" 
                style={{ color: `hsl(${genreColor})` }}
              >
                {user.genre.charAt(0).toUpperCase() + user.genre.slice(1)}
              </span>
            </p>
            <p>
              Time Online: <span className="font-semibold">{formatTime(timeSpent)}</span>
            </p>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            The visualizer adapts to your favorite genre and listening time
          </p>
        </div>

        <div className="flex-1 glass rounded-2xl overflow-hidden relative">
          <Visualizer3D />
          
          {/* Overlay info */}
          <div className="absolute bottom-6 left-6 right-6 glass rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Now Visualizing</p>
                <p className="text-lg font-semibold capitalize">{user.genre} Vibes</p>
              </div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{ backgroundColor: `hsl(${genreColor})` }}
                />
                <span className="text-sm text-muted-foreground">Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Visualizer;
