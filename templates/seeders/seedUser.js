// seeders/seedUsers.js
import { query } from '../backend/config/db';
import { hash } from 'bcrypt';

async function seedUsers() {
  try {
    // First, ensure table exists
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        color VARCHAR(30),
        password VARCHAR(255) NOT NULL,
        profile_url TEXT,
        email VARCHAR(150) UNIQUE NOT NULL,
        age INT,
        fav_color VARCHAR(30),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Prepare 10 users
    const users = [
      { name: 'Alice',   color: 'red',    pass: 'pass1', profile_url: 'https://i.pravatar.cc/150?img=1', email: 'alice@example.com',   age: 25, fav_color: 'blue' },
      { name: 'Bob',     color: 'blue',   pass: 'pass2', profile_url: 'https://i.pravatar.cc/150?img=2', email: 'bob@example.com',     age: 30, fav_color: 'green' },
      { name: 'Carol',   color: 'green',  pass: 'pass3', profile_url: 'https://i.pravatar.cc/150?img=3', email: 'carol@example.com',   age: 22, fav_color: 'purple' },
      { name: 'Dave',    color: 'yellow', pass: 'pass4', profile_url: 'https://i.pravatar.cc/150?img=4', email: 'dave@example.com',    age: 28, fav_color: 'red' },
      { name: 'Eve',     color: 'purple', pass: 'pass5', profile_url: 'https://i.pravatar.cc/150?img=5', email: 'eve@example.com',     age: 26, fav_color: 'yellow' },
      { name: 'Frank',   color: 'orange', pass: 'pass6', profile_url: 'https://i.pravatar.cc/150?img=6', email: 'frank@example.com',   age: 32, fav_color: 'black' },
      { name: 'Grace',   color: 'black',  pass: 'pass7', profile_url: 'https://i.pravatar.cc/150?img=7', email: 'grace@example.com',   age: 24, fav_color: 'white' },
      { name: 'Heidi',   color: 'white',  pass: 'pass8', profile_url: 'https://i.pravatar.cc/150?img=8', email: 'heidi@example.com',   age: 29, fav_color: 'orange' },
      { name: 'Ivan',    color: 'pink',   pass: 'pass9', profile_url: 'https://i.pravatar.cc/150?img=9', email: 'ivan@example.com',    age: 31, fav_color: 'pink' },
      { name: 'Judy',    color: 'teal',   pass: 'pass10',profile_url: 'https://i.pravatar.cc/150?img=10',email: 'judy@example.com',    age: 27, fav_color: 'teal' },
    ];

    for (const u of users) {
      const hashed = await hash(u.pass, 10);
      await query(
        `INSERT INTO users (name, color, password, profile_url, email, age, fav_color)
         VALUES ($1,$2,$3,$4,$5,$6,$7)
         ON CONFLICT (email) DO NOTHING;`,
        [u.name, u.color, hashed, u.profile_url, u.email, u.age, u.fav_color]
      );
    }

    console.log('✅ Seeded 10 users');
    process.exit(0);
  } catch (err) {
    console.error('🔴 Error seeding users:', err);
    process.exit(1);
  }
}

seedUsers();
