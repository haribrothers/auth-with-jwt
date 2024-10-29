import fs from 'fs/promises';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../../data/db.json');

class UserModel {
  constructor() {
    this.initDB();
  }

  async initDB() {
    try {
      await fs.access(dbPath);
    } catch {
      const dir = path.dirname(dbPath);
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(dbPath, JSON.stringify({ users: [] }));
    }
  }

  async readDB() {
    try {
      const data = await fs.readFile(dbPath, 'utf8');
      console.log('Database content:', data);
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading database:', error);
      return { users: [] };
    }
  }

  async writeDB(data) {
    try {
      await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error writing to database:', error);
      throw new Error('Database write error');
    }
  }

  async findOne(query) {
    try {
      console.log('Finding user with query:', query);
      const db = await this.readDB();
      const user = db.users.find(user => 
        Object.entries(query).every(([key, value]) => user[key] === value)
      );
      console.log('Found user:', user ? { ...user, password: '***' } : null);
      return user;
    } catch (error) {
      console.error('Error finding user:', error);
      return null;
    }
  }

  async findById(id) {
    try {
      console.log('Finding user by ID:', id);
      const db = await this.readDB();
      const user = db.users.find(user => user._id === id);
      console.log('Found user by ID:', user ? { ...user, password: '***' } : null);
      return user;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      return null;
    }
  }

  async create(userData) {
    try {
      const db = await this.readDB();
      const _id = Date.now().toString();
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      const newUser = {
        _id,
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        roles: ['USER'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      db.users.push(newUser);
      await this.writeDB(db);
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('User creation failed');
    }
  }

  async findByIdAndUpdate(id, update) {
    try {
      const db = await this.readDB();
      const index = db.users.findIndex(user => user._id === id);
      
      if (index === -1) return null;

      const updatedUser = {
        ...db.users[index],
        ...update,
        updatedAt: new Date().toISOString()
      };

      db.users[index] = updatedUser;
      await this.writeDB(db);
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      return null;
    }
  }
}

export default new UserModel();