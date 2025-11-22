export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  genre: string;
  timeSpent: number;
  createdAt: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  genre: string;
  coverArt: string;
}

export interface Playlist {
  id: string;
  userId: string;
  title: string;
  description: string;
  tracks: string[];
  coverArt: string;
  createdAt: string;
}
