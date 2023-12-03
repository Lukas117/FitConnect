import fs from 'fs';
import userData from './user.json' assert { type: 'json' };

export function createUser(req, res) {
  // Logic for creating a new user
  const { name, email, password } = req.body;

  // Create a new user object
  const newUser = {
    name,
    email,
    password,
  };

  // Save the new user to the user.json file
  const userFilePath = './user.json';

  if (!Array.isArray(userData)) {
    userData = [];
  }
  console.log(userData);

  userData.push(newUser);
  fs.writeFileSync(userFilePath, JSON.stringify(userData, null, 2));

  // Return the newly created user
  res.status(201).json(newUser);
}

export const getUserById = (req, res) => {
	// Logic for fetching a user by userId
	const userId = req.params.id;	

	// Find the user with the matching userId
	const user = userData.users.find((user) => user.userId == userId);
  
	if (!user) {
	  return res.status(404).json({ error: 'User not found' });
	  
	}
	res.status(200).json(user);
  };