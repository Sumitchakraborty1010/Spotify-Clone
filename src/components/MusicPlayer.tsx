import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Song } from "@/types";

interface MusicPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSongSelect: (song: Song) => void;
  playlist: Song[];
}

const MusicPlayer = ({ 
  currentSong, 
  isPlaying, 
  onPlayPause, 
  onNext, 
  onPrevious,
  onSongSelect,
  playlist
}: MusicPlayerProps) => {
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Update audio element when song changes
  useEffect(() => {
    if (audioRef.current && currentSong) {
      // Set the audio source to our music file
      audioRef.current.src = "/music/Imagine Dragons - Believer (Official Music Video) - ImagineDragonsVEVO (youtube).mp3";
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Auto-play prevented:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentSong, isPlaying]);

  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Simulate progress for demo purposes
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentSong) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            onNext();
            return 0;
          }
          return prev + 0.5;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSong, onNext]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleProgressChange = (value: number[]) => {
    setProgress(value[0]);
    // In a real implementation, we would seek the audio
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  if (!currentSong) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-50">
      <audio ref={audioRef} />
      
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Song Info */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <img 
            src={currentSong.coverArt} 
            alt={currentSong.title} 
            className="w-16 h-16 rounded-md object-cover"
          />
          <div className="min-w-0">
            <h3 className="font-semibold truncate">{currentSong.title}</h3>
            <p className="text-sm text-muted-foreground truncate">{currentSong.artist}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-primary text-primary' : ''}`} />
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onPrevious}>
              <SkipBack className="w-5 h-5" />
            </Button>
            <Button 
              className="rounded-full bg-primary hover:bg-primary-hover h-12 w-12" 
              onClick={onPlayPause}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-primary-foreground" />
              ) : (
                <Play className="w-6 h-6 fill-primary-foreground ml-1" />
              )}
            </Button>
            <Button variant="ghost" size="icon" onClick={onNext}>
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full max-w-md">
            <span className="text-xs text-muted-foreground">{formatTime(progress * 2.7)}</span>
            <Slider 
              value={[progress]} 
              onValueChange={handleProgressChange}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground">4:36</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <Volume2 className="w-5 h-5 text-muted-foreground" />
          <Slider 
            value={[volume]} 
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;