import { Song } from "@/types";
import albumElectronic from "@/assets/album-electronic.jpg";
import albumHipHop from "@/assets/album-hiphop.jpg";
import albumRock from "@/assets/album-rock.jpg";
import albumPop from "@/assets/album-pop.jpg";
import albumJazz from "@/assets/album-jazz.jpg";
import albumDefault from "@/assets/album-default.jpg";

export const mockSongs: Song[] = [
  {
    id: "1",
    title: "Midnight Pulse",
    artist: "Neon Dreams",
    album: "Electric Nights",
    duration: "3:45",
    genre: "electronic",
    coverArt: albumElectronic,
  },
  {
    id: "2",
    title: "Urban Rhythm",
    artist: "Flow Masters",
    album: "Street Poetry",
    duration: "4:12",
    genre: "hiphop",
    coverArt: albumHipHop,
  },
  {
    id: "3",
    title: "Thunder Road",
    artist: "The Riff Kings",
    album: "Electric Storm",
    duration: "5:23",
    genre: "rock",
    coverArt: albumRock,
  },
  {
    id: "4",
    title: "Summer Vibes",
    artist: "Melody Pop",
    album: "Sunshine Collection",
    duration: "3:28",
    genre: "pop",
    coverArt: albumPop,
  },
  {
    id: "5",
    title: "Smooth Sax",
    artist: "Jazz Collective",
    album: "Blue Notes",
    duration: "6:15",
    genre: "jazz",
    coverArt: albumJazz,
  },
  {
    id: "6",
    title: "Digital Dreams",
    artist: "Synth Wave",
    album: "Cyber Future",
    duration: "4:02",
    genre: "electronic",
    coverArt: albumElectronic,
  },
  {
    id: "7",
    title: "City Lights",
    artist: "MC Verse",
    album: "Concrete Jungle",
    duration: "3:55",
    genre: "hiphop",
    coverArt: albumHipHop,
  },
  {
    id: "8",
    title: "Fire & Ice",
    artist: "Rock Legends",
    album: "Arena Anthems",
    duration: "4:48",
    genre: "rock",
    coverArt: albumRock,
  },
  {
    id: "9",
    title: "Love Tonight",
    artist: "Pop Stars",
    album: "Chart Toppers",
    duration: "3:35",
    genre: "pop",
    coverArt: albumPop,
  },
  {
    id: "10",
    title: "Moonlight Serenade",
    artist: "The Jazz Quartet",
    album: "Late Night Sessions",
    duration: "5:42",
    genre: "jazz",
    coverArt: albumJazz,
  },
  {
    id: "11",
    title: "Bass Drop",
    artist: "EDM Fusion",
    album: "Festival Hits",
    duration: "3:18",
    genre: "electronic",
    coverArt: albumElectronic,
  },
  {
    id: "12",
    title: "Hustle Hard",
    artist: "Rap Dynasty",
    album: "Success Story",
    duration: "4:25",
    genre: "hiphop",
    coverArt: albumHipHop,
  },
];

export const genreColors: Record<string, string> = {
  electronic: "270 80% 60%",
  rock: "0 80% 55%",
  pop: "330 80% 60%",
  hiphop: "25 85% 55%",
  jazz: "210 70% 50%",
};

export const getAlbumArt = (genre: string): string => {
  const albums: Record<string, string> = {
    electronic: albumElectronic,
    hiphop: albumHipHop,
    rock: albumRock,
    pop: albumPop,
    jazz: albumJazz,
  };
  return albums[genre] || albumDefault;
};
