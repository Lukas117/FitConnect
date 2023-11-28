// controllers/userController.js
const generateUserId = () => {
	// Logic to generate a unique user ID (you might want to use a library for this)
	return Math.random().toString(36).substring(7);
  };
  
  const createUser = (req, res) => {
	// Logic for creating a new user
	// Extract user data from req.body
  
	// Generate a new userId
	const userId = generateUserId();
  
	// Set other properties
	const newUser = {
	  userId,
	  // ...other properties from req.body
	  createdAt: new Date().toISOString(),
	};
  
	// Return the newly created user
	res.status(201).json(newUser);
  };
  
  const getUserById = (req, res) => {
	// Logic for fetching a user by userId
	const userId = req.params.id;
  
	// Fetch user from the database or your data source (dummy data for now)
	const user = getUserFromDatabase(userId);
  
	if (!user) {
	  return res.status(404).json({ error: 'User not found' });
	}
  
	res.status(200).json(user);
  };
  
  // Dummy function for fetching a user from the database (replace with actual database logic)
  const getUserFromDatabase = (userId) => {
	// For now, use dummyUsers array from dummyData.js for testing
	const dummyUsers = require('../dummyData').dummyUsers;
	return dummyUsers.find((user) => user.userId === userId);
  };
  
  module.exports = { createUser, getUserById };
  