import { useState } from "react";
import { Trash2, Music } from "lucide-react";
import Layout from "@/components/Layout";
import PlaylistModal from "@/components/PlaylistModal";
import { Button } from "@/components/ui/button";
import { getUser, getUserPlaylists, deletePlaylist } from "@/lib/storage";
import { mockSongs } from "@/lib/mockData";
import { toast } from "sonner";

const Playlists = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const user = getUser();

  if (!user) return null;

  const userPlaylists = getUserPlaylists(user.id);

  const handleDeletePlaylist = (id: string, title: string) => {
    if (confirm(`Delete "${title}"?`)) {
      deletePlaylist(id);
      toast.success("Playlist deleted");
      setRefresh(prev => prev + 1);
    }
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-8 backdrop-blur-sm">
          <h1 className="text-5xl font-bold mb-2 slide-in-left">My Playlists</h1>
          <p className="text-xl text-muted-foreground slide-in-left">
            Your personal collection of favorite tracks
          </p>
        </div>

        {userPlaylists.length === 0 ? (
          <div className="text-center py-20">
            <Music className="w-24 h-24 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-semibold mb-2">No playlists yet</h2>
            <p className="text-muted-foreground mb-6">
              Create your first playlist and start adding songs
            </p>
            <Button
              onClick={() => setModalOpen(true)}
              className="bg-primary hover:bg-primary-hover glow-button"
            >
              Create Playlist
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userPlaylists.map((playlist) => {
              const playlistSongs = mockSongs.filter(song => 
                playlist.tracks.includes(song.id)
              );
              
              return (
                <div
                  key={playlist.id}
                  className="bg-card rounded-xl overflow-hidden hover-scale hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20">
                    <img
                      src={playlist.coverArt}
                      alt={playlist.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{playlist.title}</h3>
                    {playlist.description && (
                      <p className="text-muted-foreground text-sm mb-4">
                        {playlist.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {playlist.tracks.length} songs
                      </span>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDeletePlaylist(playlist.id, playlist.title)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {playlistSongs.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-border space-y-2">
                        {playlistSongs.slice(0, 3).map(song => (
                          <div key={song.id} className="flex items-center gap-2 text-sm">
                            <Music className="w-3 h-3 text-muted-foreground" />
                            <span className="truncate">{song.title}</span>
                          </div>
                        ))}
                        {playlistSongs.length > 3 && (
                          <p className="text-xs text-muted-foreground">
                            +{playlistSongs.length - 3} more
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <PlaylistModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setRefresh(prev => prev + 1);
        }}
      />
    </Layout>
  );
};

export default Playlists;
