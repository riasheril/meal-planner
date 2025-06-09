const connectDB = require('../config/db');
const User = require('../models/User');

async function seedMockUsers() {
  await connectDB();

  // Clear existing users
  await User.deleteMany({});

  // Create mock users
  const users = [
    { email: 'mockuser@example.com', password: 'password123' },
    { email: 'testuser@example.com', password: 'testpass' },
    { email: 'foodie@example.com', password: 'letseat' }
  ];

  for (const userData of users) {
    await User.create(userData);
    console.log(`Created user: ${userData.email}`);
  }

  process.exit(0);
}

seedMockUsers(); 