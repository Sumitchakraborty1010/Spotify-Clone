import { Plus, Play } from "lucide-react";
import { Song } from "@/types";
import { Button } from "@/components/ui/button";

interface SongCardProps {
  song: Song;
  onAddToPlaylist: (song: Song) => void;
  onPlay: (song: Song) => void;
}

const SongCard = ({ song, onAddToPlaylist, onPlay }: SongCardProps) => {
  return (
    <div 
      className="group bg-card rounded-lg p-4 hover:bg-card/80 transition-all duration-300 hover-scale cursor-pointer"
      onClick={() => onPlay(song)}
    >
      <div className="relative mb-4">
        <img
          src={song.coverArt}
          alt={song.title}
          className="w-full aspect-square object-cover rounded-md"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center gap-2">
          <Button
            size="icon"
            className="rounded-full bg-primary hover:bg-primary-hover h-12 w-12"
            onClick={(e) => {
              e.stopPropagation();
              onPlay(song);
            }}
          >
            <Play className="w-6 h-6 fill-primary-foreground" />
          </Button>
        </div>
      </div>

      <h3 className="font-semibold text-foreground mb-1 truncate">{song.title}</h3>
      <p className="text-sm text-muted-foreground mb-2 truncate">{song.artist}</p>
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{song.duration}</span>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 gap-1"
          onClick={(e) => {
            e.stopPropagation();
            onAddToPlaylist(song);
          }}
        >
          <Plus className="w-4 h-4" />
          Add
        </Button>
      </div>
    </div>
  );
};

export default SongCard;