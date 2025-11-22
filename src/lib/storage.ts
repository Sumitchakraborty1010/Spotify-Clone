import { User, Playlist } from "@/types";
import { initDatabase, createUser, findUserByUsername, findUserById, updateUserTimeSpent } from "./database";

// Initialize database when storage module is loaded
initDatabase();

const STORAGE_KEYS = {
  USER_ID: "spotify_user_id",
  PLAYLISTS: "spotify_playlists",
  TIME_SPENT: "spotify_time_spent",
  SESSION_START: "spotify_session_start",
};

// User management
export const saveUser = async (user: Omit<User, 'id'>): Promise<User | null> => {
  // Check if user already exists
  const existingUser = await findUserByUsername(user.username);
  if (existingUser) {
    console.log(`User with username ${user.username} already exists`);
    return null;
  }

  // Create user in database
  const dbUser = await createUser({
    username: user.username,
    email: user.email,
    password: user.password,
    genre: user.genre,
    createdAt: user.createdAt
  });
  
  if (dbUser) {
    // Store user ID in localStorage for session management
    localStorage.setItem(STORAGE_KEYS.USER_ID, dbUser.id.toString());
    return {
      id: dbUser.id.toString(),
      username: dbUser.username,
      email: dbUser.email,
      password: user.password, // Note: In a real app, we'd hash this
      genre: dbUser.genre,
      timeSpent: dbUser.timeSpent,
      createdAt: dbUser.createdAt
    };
  }
  
  return null;
};

export const getUser = async (): Promise<User | null> => {
  const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
  if (!userId) return null;
  
  const dbUser = await findUserById(parseInt(userId));
  if (!dbUser) return null;
  
  return {
    id: dbUser.id.toString(),
    username: dbUser.username,
    email: dbUser.email,
    password: "", // We don't store password in localStorage for security
    genre: dbUser.genre,
    timeSpent: dbUser.timeSpent,
    createdAt: dbUser.createdAt
  };
};

export const findUser = async (username: string): Promise<User | null> => {
  console.log(`Finding user with username: ${username}`);
  const dbUser = await findUserByUsername(username);
  if (!dbUser) {
    console.log(`No user found with username: ${username}`);
    return null;
  }
  
  console.log(`Found user: ${dbUser.username}`);
  return {
    id: dbUser.id.toString(),
    username: dbUser.username,
    email: dbUser.email,
    password: dbUser.password,
    genre: dbUser.genre,
    timeSpent: dbUser.timeSpent,
    createdAt: dbUser.createdAt
  };
};

export const updateUser = async (updates: Partial<User>): Promise<void> => {
  const user = await getUser();
  if (user) {
    // In a real implementation, we would update the database here
    // For now, we'll just update localStorage if needed
  }
};

export const clearUser = (): void => {
  localStorage.removeItem(STORAGE_KEYS.USER_ID);
};

// Playlist management (keeping existing localStorage implementation for now)
export const savePlaylists = (playlists: Playlist[]): void => {
  localStorage.setItem(STORAGE_KEYS.PLAYLISTS, JSON.stringify(playlists));
};

export const getPlaylists = (): Playlist[] => {
  const playlistsData = localStorage.getItem(STORAGE_KEYS.PLAYLISTS);
  return playlistsData ? JSON.parse(playlistsData) : [];
};

export const getUserPlaylists = (userId: string): Playlist[] => {
  return getPlaylists().filter((playlist) => playlist.userId === userId);
};

export const addPlaylist = (playlist: Playlist): void => {
  const playlists = getPlaylists();
  playlists.push(playlist);
  savePlaylists(playlists);
};

export const updatePlaylist = (id: string, updates: Partial<Playlist>): void => {
  const playlists = getPlaylists();
  const index = playlists.findIndex((p) => p.id === id);
  if (index !== -1) {
    playlists[index] = { ...playlists[index], ...updates };
    savePlaylists(playlists);
  }
};

export const deletePlaylist = (id: string): void => {
  const playlists = getPlaylists().filter((p) => p.id !== id);
  savePlaylists(playlists);
};

// Time tracking
export const startTimeTracking = (): void => {
  localStorage.setItem(STORAGE_KEYS.SESSION_START, Date.now().toString());
};

export const getTimeSpent = async (): Promise<number> => {
  const user = await getUser();
  const sessionStart = localStorage.getItem(STORAGE_KEYS.SESSION_START);
  
  if (!user) return 0;
  
  const currentSessionTime = sessionStart 
    ? Math.floor((Date.now() - parseInt(sessionStart)) / 1000)
    : 0;
  
  return (user.timeSpent || 0) + currentSessionTime;
};

export const saveTimeSpent = async (): Promise<void> => {
  const user = await getUser();
  if (user) {
    const totalTime = await getTimeSpent();
    await updateUserTimeSpent(parseInt(user.id), totalTime);
    localStorage.removeItem(STORAGE_KEYS.SESSION_START);
  }
};

// Generate user avatar from username
export const generateAvatar = (username: string): string => {
  const colors = ["1db954", "1ed760", "ff6b6b", "4ecdc4", "45b7d1"];
  const colorIndex = username.charCodeAt(0) % colors.length;
  const initials = username.slice(0, 2).toUpperCase();
  
  return `https://ui-avatars.com/api/?name=${initials}&background=${colors[colorIndex]}&color=fff&size=200&bold=true`;
};