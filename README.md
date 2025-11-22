# SoundWave - Spotify Clone

A modern music streaming application built with React, TypeScript, and Vite. This project replicates key features of Spotify with a sleek, responsive design.

![SoundWave Demo](https://placehold.co/800x400/1db954/white?text=SoundWave+Music+Player)

## Features

- 🎵 **Music Streaming**: Play music with a fully functional player
- 🔍 **Discover Music**: Browse songs by genre and discover new music
- 📝 **Playlists**: Create and manage custom playlists
- 🎨 **3D Visualizer**: Experience music with an interactive audio visualizer
- 🔐 **User Authentication**: Secure login and signup with SQLite database
- 📱 **Responsive Design**: Works on all device sizes
- 🌙 **Dark Mode**: Eye-friendly dark theme

## Demo

Try the live demo: [SoundWave Demo](https://soundwave-demo.example.com)

## Tech Stack Explained

This project uses a modern tech stack that combines powerful tools for building fast, scalable web applications:

### Core Technologies

- **React 18**: A JavaScript library for building user interfaces. React allows us to create reusable UI components and manage application state efficiently.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript. TypeScript helps catch errors early and provides better tooling and documentation.
- **Vite**: A next-generation frontend tool that significantly improves the development experience with fast hot module replacement (HMR) and optimized builds.

### Styling & UI

- **Tailwind CSS**: A utility-first CSS framework that allows for rapid UI development without writing custom CSS. Styles are applied directly in the HTML using class names.
- **shadcn/ui**: A collection of accessible, customizable UI components built with Radix UI and Tailwind CSS. Provides pre-built components like buttons, cards, and dialogs.

### Data Management

- **SQLite**: A lightweight, serverless database that runs in the browser. Used for storing user account information.
- **localStorage**: Browser storage API used for storing playlist data and user sessions.

### Additional Libraries

- **React Router**: Declarative routing for React applications, enabling navigation between different pages.
- **React Query**: Server state management library that simplifies data fetching, caching, and synchronization.
- **Three.js**: A JavaScript library used to create and display 3D graphics in the browser, powering the audio visualizer.
- **Lucide React**: Beautiful, consistent icons as React components.

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sumitchakraborty1010/spotify-clone.git
   ```

2. Navigate to the project directory:
   ```bash
   cd spotify-clone
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:8080`.

### Building for Production

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Understanding This Project - A Beginner's Guide

### 1. Project Structure

The project follows a component-based architecture where different parts of the UI are broken down into reusable components:

```
src/
├── components/     # Reusable UI components (buttons, cards, player, etc.)
├── pages/          # Page-level components (Discover, Playlists, Login, etc.)
├── lib/            # Utility functions, mock data, and business logic
├── hooks/          # Custom React hooks for reusable state logic
├── types/          # TypeScript type definitions
└── assets/         # Static assets like images
```

### 2. How the Music Player Works

The music player is a central feature of the application:

1. **Audio Element**: Uses the HTML5 `<audio>` element to play music files
2. **State Management**: Tracks playback state (playing/paused), current song, volume, and progress
3. **Controls**: Provides play/pause, next/previous, and volume controls
4. **Integration**: Connects with song cards to play music when a song is selected

### 3. Authentication System

The authentication system uses SQLite for user storage:

1. **Login/Signup Pages**: Handle user authentication
2. **SQLite Database**: Stores user account information in the browser
3. **Session Management**: Uses localStorage to maintain user sessions
4. **Protected Routes**: Ensures only authenticated users can access certain pages

### 4. Data Flow

1. **Mock Data**: Songs and album information are stored in `src/lib/mockData.ts`
2. **Components**: UI components display this data
3. **State**: React state manages user interactions and application state
4. **Storage**: User data is persisted using SQLite and localStorage

### 5. Key Concepts for Beginners

- **Components**: Building blocks of the UI that can be reused throughout the application
- **Props**: Data passed from parent to child components
- **State**: Data that changes over time and triggers UI updates
- **Hooks**: Functions that let you "hook into" React state and lifecycle features
- **Routing**: Navigation between different pages of the application

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── lib/            # Utility functions and data
├── hooks/          # Custom React hooks
├── types/          # TypeScript type definitions
├── assets/         # Static assets
└── styles/         # Global styles
```

## Key Components

### Music Player

A fully functional music player with:
- Play/Pause controls
- Next/Previous track navigation
- Volume control
- Progress bar
- Song information display

### Authentication

Secure user authentication system with:
- Login/Signup pages
- SQLite database for user storage
- Default accounts (user/user123, admin/admin123)

### Discover Page

Browse and discover music:
- Genre filtering
- Song cards with album art
- Add to playlist functionality

### Playlists

Create and manage playlists:
- Create new playlists
- Add songs to playlists
- View and edit existing playlists

### 3D Visualizer

Interactive audio visualization:
- Real-time 3D graphics
- Audio-reactive animations
- Immersive experience

## Database

The application uses SQLite for data storage:

- User accounts stored in a local SQLite database
- Playlist data stored in localStorage
- Session management with localStorage

Default accounts:
- Username: `user`, Password: `user123`
- Username: `admin`, Password: `admin123`

## Customization

### Theme

The application uses Tailwind CSS for styling with a dark theme. You can customize the theme in `tailwind.config.js`.

### Adding Music

To add your own music:
1. Place audio files in the `public/music` directory
2. Update the mock data in `src/lib/mockData.ts` to reference your files

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Lucide Icons](https://lucide.dev/) for the icon set
- [Vite](https://vitejs.dev/) for the fast build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/your-username/spotify-clone/issues) on GitHub.
