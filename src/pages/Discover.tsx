import { useState } from "react";
import { Plus } from "lucide-react";
import Layout from "@/components/Layout";
import SongCard from "@/components/SongCard";
import PlaylistModal from "@/components/PlaylistModal";
import MusicPlayer from "@/components/MusicPlayer";
import { Button } from "@/components/ui/button";
import { mockSongs } from "@/lib/mockData";
import { Song } from "@/types";
import { getUser } from "@/lib/storage";

const Discover = () => {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const user = getUser();

  const filteredSongs = filter === "all" 
    ? mockSongs 
    : mockSongs.filter(song => song.genre === filter);

  const handleAddToPlaylist = (song: Song) => {
    setSelectedSong(song);
    setModalOpen(true);
  };

  const handlePlay = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (!currentSong) return;
    const currentIndex = mockSongs.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % mockSongs.length;
    setCurrentSong(mockSongs[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (!currentSong) return;
    const currentIndex = mockSongs.findIndex(song => song.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + mockSongs.length) % mockSongs.length;
    setCurrentSong(mockSongs[prevIndex]);
    setIsPlaying(true);
  };

  return (
    <Layout>
      <div className="p-8 pb-32"> {/* Added pb-32 to account for fixed player */}
        {/* Header with dynamic background */}
        <div className="mb-8 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-8 backdrop-blur-sm">
          <h1 className="text-5xl font-bold mb-2 slide-in-left">Discover Music</h1>
          <p className="text-xl text-muted-foreground slide-in-left">
            Explore trending songs and build your perfect playlist
          </p>
        </div>

        {/* Genre Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {["all", "electronic", "rock", "pop", "hiphop", "jazz"].map((genre) => (
            <Button
              key={genre}
              variant={filter === genre ? "default" : "outline"}
              onClick={() => setFilter(genre)}
              className={filter === genre ? "bg-primary hover:bg-primary-hover" : ""}
            >
              {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </Button>
          ))}
        </div>

        {/* Create Playlist Button */}
        <div className="mb-6">
          <Button
            onClick={() => {
              setSelectedSong(null);
              setModalOpen(true);
            }}
            className="bg-primary hover:bg-primary-hover glow-button"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Playlist
          </Button>
        </div>

        {/* Songs Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onAddToPlaylist={handleAddToPlaylist}
              onPlay={handlePlay}
            />
          ))}
        </div>
      </div>

      <PlaylistModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        song={selectedSong || undefined}
      />

      {/* Music Player */}
      <MusicPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSongSelect={handlePlay}
        playlist={mockSongs}
      />
    </Layout>
  );
};

export default Discover;