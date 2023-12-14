import fs from 'fs';
import userData from './user.json' assert { type: 'json' };


export const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const userData = JSON.parse(fs.readFileSync(userFilePath, 'utf8'));
    const existingUser = userData.users.find((user) => user.username === username);
    if (existingUser) {
      res.status(400).json({ error: 'Username already exists' });
      return;
    }


    const newUser = {
      username,
      passwordHash: hashedPassword,
    };

    userData.users.push(newUser);

    fs.writeFileSync(userFilePath, JSON.stringify(userData, null, 2));

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserById = (req, res) => {
	const userId = req.params.id;	

	const user = userData.users.find((user) => user.userId == userId);
  
	if (!user) {
	  return res.status(404).json({ error: 'User not found' });
	  
	}
	res.status(200).json(user);
  };


  export const login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = userData.users.find((user) => user.username == username);
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid user' });
      }
  
      if (user.password == password) {

        return res.status(200).json({ success: true, message: 'Login successful' });
      } else {

        return res.status(401).json({ error: 'Invalid pass' });
      }
    } catch (error) {
      next(error);
    }
  };
  