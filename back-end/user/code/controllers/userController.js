import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';
import { makeUserAsync, matchPassword, getUserFromFieldAndValueAsync, updateUserFromFieldMatch } from './userFunctions.js';
import dotenv from 'dotenv';
dotenv.config({ path: './/.env' });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);


/**
 * Handles the registration of a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with user and token.
 */
export async function register(req, res) {
  const { name, user_name, birth_date, email, password_hash } = req.body;
  let password = password_hash;
  if (!name || !user_name || !birth_date || !email || !password) return res.status(400).send("Bad Request: Missing required fields");

  let user;
  try {
    user = await getUserFromFieldAndValueAsync("user_name", user_name);
    if (user) throw new Error("User already exists.");
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }

  if (!user) {
    try {
      user = await makeUserAsync(name, user_name, birth_date, email, password);
      if (!user) throw new Error('Error creating user.');
    } catch (error) {
      return res.status(500).send("Internal Server Error");
    }
  }
  user = await getUserFromFieldAndValueAsync("user_name", user_name);
  const token = jwt.sign({ userId: user.id }, 'wompwomp', { expiresIn: '24h' });
  const verifieedtoken = jwt.verify(token, 'wompwomp');
  return res.status(200).json({ token });
}

/**
 * Retrieves a user based on their ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with the user.
 */
export async function getUserFromId(req, res) {
  const userId = req.params.id;

  let user;
  if (userId) {
    try {
      user = await getUserFromFieldAndValueAsync('id', userId);
      if (!user) throw new Error(`Couldn't find user with id: ${userId}`);
    } catch (error) {
      return res.status(404).json({ userId: userId });
    }

    return res.status(200).json(user);
  }
}

/**
 * Handles user login.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with user and token.
 */
export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    let user = await getUserFromFieldAndValueAsync('email', email);
    if (!user) {
      return res.status(404).json({ error: "Email or password is not valid." });
    }

    let passwordMatched =  matchPassword(user.password_hash, password, user.password_salt);
    if (passwordMatched) {
      const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '24h' });
      return res.status(200).json({ user, token });
    } else {
      return res.status(404).json({ error: "Email or password is not valid." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
}

/**
 * Adds a sport list to a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with the updated sport list.
 */
export async function addSportList(req, res) {
  const { idList, userId } = req.body;

  // Debugging: Check the values of sport_list and userId
 

  if (!idList|| !userId) {
    return res.status(400).json({ error: "Sport list and userId are required." });
  }
  console.log('idList:', idList);
  // Debugging: Check if updateUserFromFieldMatch is working correctly
  const updateUserError = await updateUserFromFieldMatch('Id', userId, { sport_list: idList});
  console.log('updateUserError:', updateUserError);

  if (updateUserError) {
    return res.status(500).json({ error: updateUserError.message });
  }

  return res.status(201).json({ sport: sport_list });
}

/**
 * Checks the JWT and returns the user ID if it is valid.
 * @param {Object} req - The request object.
 * @returns {string|null} - The user ID if the JWT is valid, otherwise null.
 */
export function getUserIdFromJWT(req, res) {
  const authToken = req.headers.cookie.split('; ').find(cookie => cookie.startsWith('token='));

  if (authToken) {
    try {
      const token = authToken.split('=')[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      return  res.status(200).json({ message: 'Authorized', userId: decodedToken.userId});
    } catch (error) {
      // Token verification failed
      return null;
    }
  }

  return null; 
}