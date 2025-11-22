import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Playlist, Song } from "@/types";
import { getUser, addPlaylist, getUserPlaylists, updatePlaylist } from "@/lib/storage";
import { getAlbumArt } from "@/lib/mockData";
import { toast } from "sonner";

interface PlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  song?: Song;
}

const PlaylistModal = ({ isOpen, onClose, song }: PlaylistModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showCreateNew, setShowCreateNew] = useState(false);
  const user = getUser();

  if (!isOpen || !user) return null;

  const userPlaylists = getUserPlaylists(user.id);

  const handleCreatePlaylist = () => {
    if (!title.trim()) {
      toast.error("Please enter a playlist name");
      return;
    }

    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      userId: user.id,
      title,
      description,
      tracks: song ? [song.id] : [],
      coverArt: getAlbumArt(user.genre),
      createdAt: new Date().toISOString(),
    };

    addPlaylist(newPlaylist);
    toast.success(`Playlist "${title}" created!`);
    onClose();
    setTitle("");
    setDescription("");
    setShowCreateNew(false);
  };

  const handleAddToPlaylist = (playlistId: string) => {
    if (!song) return;

    const playlist = userPlaylists.find((p) => p.id === playlistId);
    if (!playlist) return;

    if (playlist.tracks.includes(song.id)) {
      toast.info("Song already in this playlist");
      return;
    }

    updatePlaylist(playlistId, {
      tracks: [...playlist.tracks, song.id],
    });

    toast.success(`Added to "${playlist.title}"`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 fade-in">
      <div className="glass rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {song ? "Add to Playlist" : "Create Playlist"}
          </h2>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {!showCreateNew && song ? (
          <div className="space-y-3">
            {userPlaylists.length > 0 ? (
              <>
                {userPlaylists.map((playlist) => (
                  <button
                    key={playlist.id}
                    onClick={() => handleAddToPlaylist(playlist.id)}
                    className="w-full p-3 bg-card rounded-lg hover:bg-card/80 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={playlist.coverArt}
                        alt={playlist.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium">{playlist.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {playlist.tracks.length} songs
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
                <Button
                  onClick={() => setShowCreateNew(true)}
                  variant="outline"
                  className="w-full"
                >
                  Create New Playlist
                </Button>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No playlists yet</p>
                <Button
                  onClick={() => setShowCreateNew(true)}
                  className="bg-primary hover:bg-primary-hover"
                >
                  Create Your First Playlist
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Playlist Name</Label>
              <Input
                id="title"
                placeholder="My Awesome Playlist"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                placeholder="Describe your playlist..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-background/50 resize-none"
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleCreatePlaylist}
                className="flex-1 bg-primary hover:bg-primary-hover"
              >
                Create
              </Button>
              {song && (
                <Button
                  onClick={() => setShowCreateNew(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistModal;
