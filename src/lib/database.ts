import initSqlJs, { Database } from 'sql.js';

// Initialize SQL.js
let db: Database | null = null;
let initializing: Promise<void> | null = null;

// Initialize the database
export const initDatabase = async (): Promise<void> => {
  if (db) return;
  
  if (initializing) {
    // If initialization is already in progress, wait for it to complete
    return initializing;
  }

  initializing = (async () => {
    try {
      console.log('Initializing database...');
      const SQL = await initSqlJs({
        locateFile: (file: string) => `https://sql.js.org/dist/${file}`
      });

      db = new SQL.Database();
      console.log('Database created successfully');

      // Create users table
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          genre TEXT NOT NULL,
          time_spent INTEGER DEFAULT 0,
          created_at TEXT NOT NULL
        )
      `);
      console.log('Users table created');

      // Create playlists table
      db.run(`
        CREATE TABLE IF NOT EXISTS playlists (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          title TEXT NOT NULL,
          description TEXT,
          tracks TEXT,
          cover_art TEXT,
          created_at TEXT NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users (id)
        )
      `);
      console.log('Playlists table created');
      
      // Create default users if they don't exist
      await createDefaultUsers();
      
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    } finally {
      initializing = null;
    }
  })();
  
  return initializing;
};

// Ensure database is initialized before running queries
const ensureDatabase = async (): Promise<void> => {
  if (db) return;
  if (initializing) {
    return initializing;
  }
  return initDatabase();
};

// Create default users
const createDefaultUsers = async (): Promise<void> => {
  await ensureDatabase();
  if (!db) {
    console.error('Database not available for creating default users');
    return;
  }

  try {
    // Check if default users already exist
    const result = db.exec(`
      SELECT COUNT(*) as count FROM users WHERE username IN ('user', 'admin')
    `);

    const count = result.length > 0 && result[0].values.length > 0 
      ? (result[0].values[0][0] as number) 
      : 0;

    console.log(`Found ${count} default users in database`);

    // If no default users exist, create them
    if (count === 0) {
      console.log('Creating default users...');
      const stmt = db.prepare(`
        INSERT INTO users (username, email, password, genre, created_at)
        VALUES (?, ?, ?, ?, ?)
      `);

      // Create default 'user' account
      stmt.run(['user', 'user@example.com', 'user123', 'pop', new Date().toISOString()]);
      console.log('Created default user: user');
      
      // Create default 'admin' account
      stmt.run(['admin', 'admin@example.com', 'admin123', 'rock', new Date().toISOString()]);
      console.log('Created default user: admin');
      
      stmt.free();
      
      console.log('Default users created: user/user123, admin/admin123');
    } else {
      console.log('Default users already exist');
    }
  } catch (error) {
    console.error('Error creating default users:', error);
  }
};

// User operations
export const createUser = async (user: {
  username: string;
  email: string;
  password: string;
  genre: string;
  createdAt: string;
}): Promise<{ id: number; username: string; email: string; genre: string; timeSpent: number; createdAt: string } | null> => {
  await ensureDatabase();
  if (!db) throw new Error('Database not initialized');

  try {
    const stmt = db.prepare(`
      INSERT INTO users (username, email, password, genre, created_at)
      VALUES (?, ?, ?, ?, ?)
    `);

    stmt.run([
      user.username,
      user.email,
      user.password,
      user.genre,
      user.createdAt
    ]);

    stmt.free();

    // Get the inserted user
    const result = db.exec(`
      SELECT id, username, email, genre, time_spent, created_at
      FROM users
      WHERE username = ?
    `, [user.username]);

    if (result.length > 0 && result[0].values.length > 0) {
      const row = result[0].values[0];
      return {
        id: row[0] as number,
        username: row[1] as string,
        email: row[2] as string,
        genre: row[3] as string,
        timeSpent: row[4] as number,
        createdAt: row[5] as string
      };
    }

    return null;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
};

export const findUserByUsername = async (username: string): Promise<{ 
  id: number; 
  username: string; 
  email: string; 
  password: string; 
  genre: string; 
  timeSpent: number; 
  createdAt: string 
} | null> => {
  await ensureDatabase();
  if (!db) {
    console.error('Database not initialized when trying to find user by username');
    return null;
  }

  try {
    console.log(`Searching for user with username: ${username}`);
    const result = db.exec(`
      SELECT id, username, email, password, genre, time_spent, created_at
      FROM users
      WHERE username = ?
    `, [username]);

    if (result.length > 0 && result[0].values.length > 0) {
      const row = result[0].values[0];
      console.log(`Found user: ${row[1]}`);
      return {
        id: row[0] as number,
        username: row[1] as string,
        email: row[2] as string,
        password: row[3] as string,
        genre: row[4] as string,
        timeSpent: row[5] as number,
        createdAt: row[6] as string
      };
    } else {
      console.log(`No user found with username: ${username}`);
    }

    return null;
  } catch (error) {
    console.error('Error finding user by username:', error);
    return null;
  }
};

export const findUserById = async (id: number): Promise<{ 
  id: number; 
  username: string; 
  email: string; 
  genre: string; 
  timeSpent: number; 
  createdAt: string 
} | null> => {
  await ensureDatabase();
  if (!db) throw new Error('Database not initialized');

  try {
    const result = db.exec(`
      SELECT id, username, email, genre, time_spent, created_at
      FROM users
      WHERE id = ?
    `, [id]);

    if (result.length > 0 && result[0].values.length > 0) {
      const row = result[0].values[0];
      return {
        id: row[0] as number,
        username: row[1] as string,
        email: row[2] as string,
        genre: row[3] as string,
        timeSpent: row[4] as number,
        createdAt: row[5] as string
      };
    }

    return null;
  } catch (error) {
    console.error('Error finding user:', error);
    return null;
  }
};

// Update user time spent
export const updateUserTimeSpent = async (userId: number, timeSpent: number): Promise<boolean> => {
  await ensureDatabase();
  if (!db) throw new Error('Database not initialized');

  try {
    const stmt = db.prepare(`
      UPDATE users
      SET time_spent = ?
      WHERE id = ?
    `);

    stmt.run([timeSpent, userId]);
    stmt.free();

    return true;
  } catch (error) {
    console.error('Error updating user time spent:', error);
    return false;
  }
};