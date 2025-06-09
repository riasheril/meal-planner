const connectDB = require('../config/db');
const User = require('../models/User');

async function seedMockUsers() {
  await connectDB();

  // Clear existing users
  await User.deleteMany({});

  // Create mock users
  const users = [
    {
      email: 'mockuser@example.com',
      password: 'password123',
      preferences: {
        dietaryRestrictions: ['gluten-free', 'vegan'],
        cuisineTypes: ['italian', 'mexican'],
        cookingTime: 20,
        servingSize: 2
      }
    },
    {
      email: 'testuser@example.com',
      password: 'testpass',
      preferences: {
        dietaryRestrictions: ['ketogenic'],
        cuisineTypes: ['japanese', 'thai'],
        cookingTime: 40,
        servingSize: 4
      }
    },
    {
      email: 'foodie@example.com',
      password: 'letseat',
      preferences: {
        dietaryRestrictions: [], // No restrictions
        cuisineTypes: [], // No preference
        cookingTime: 60,
        servingSize: 1
      }
    }
  ];

  for (const userData of users) {
    await User.create(userData);
    console.log(`Created user: ${userData.email}`);
  }

  process.exit(0);
}

seedMockUsers(); 