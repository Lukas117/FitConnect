import { createClient } from '@supabase/supabase-js';
import crypto, { scrypt } from 'crypto';
import dotenv from 'dotenv';
dotenv.config({ path: './/.env' });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const hashLength = 64;

/**
 * Creates a new user asynchronously.
 * @param {string} name - The name of the user.
 * @param {string} user_name - The username of the user.
 * @param {Date} birth_date - The birth date of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<User>} - The newly created user.
 * @throws {Error} - If an error occurs during the operation.
 */
export async function makeUserAsync(name, user_name, birth_date, email, password) {

  if (!name || !user_name || !birth_date || !email || !password) throw new Error('Missing required fields');
  const newUser = {
    name,
    user_name,
    birth_date,
    email,
    password_salt: null,
    password_hash: null,
  };

  newUser.password_salt = crypto.randomBytes(16).toString('hex');
  newUser.password_hash = await makePasswordAsync(password, newUser.password_salt);

  try {
    const { data: user, error: makeUserError } = await supabase
      .from('user')
      .upsert(newUser);

    if (makeUserError) {
      throw makeUserError;
    }

    return newUser;
  } catch (error) {
    throw new Error('Error occurred during user creation');
  }
}

/**
 * Generates a password hash asynchronously.
 * @param {string} password - The password to hash.
 * @param {string} password_salt - The salt to use for hashing.
 * @returns {Promise<string>} - The hashed password.
 * @throws {Error} - If an error occurs during the operation.
 */
export async function makePasswordAsync(password, password_salt) {
  if (!password || !password_salt) throw new Error('Missing required fields');
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, password_salt, hashLength, (err, derivedKey) => {
      if (err) {
        reject(err);
      } else {
        const password_hash = derivedKey.toString('hex');
        resolve(password_hash);
      }
    });
  });
}

/**
 * Compares a password with a hashed password and salt.
 * @param {string} hashed_password - The hashed password to compare.
 * @param {string} password - The password to compare.
 * @param {string} salt - The salt used for hashing.
 * @returns {boolean} - True if the passwords match, false otherwise.
 */
export async function matchPassword(hashed_password, password, salt) {
  const passwordBuffer = Buffer.from(password);
  const saltBuffer = Buffer.from(salt, 'hex');

  try {
    const derivedKey = await makePasswordAsync(password, salt);
    return derivedKey === hashed_password;
  } catch (error) {
    return false;
  }
}

/**
 * Retrieves a user from the 'user' table based on a specific field and value.
 * @param {string} name - The name of the field to search for.
 * @param {any} valueMatch - The value to match against the field.
 * @returns {Promise<User|null>} - The user if found, null otherwise.
 * @throws {Error} - If an error occurs during the operation.
 */
export async function getUserFromFieldAndValueAsync(name, valueMatch) {
  if (!name || !valueMatch) throw new Error('Missing required fields');
  try {
    const { data, error } = await supabase.from('user').select('*').eq(name, valueMatch);
    if (error) throw new Error('Error occurred during user retrieval');

    const matchingUser = data.find(user => user[name] == valueMatch);
    if (matchingUser)
      return matchingUser
    else {
      return null;
    }
  } catch (error) {
    throw new Error(`Error occurred during user retrieval: ${error.message}`);
  }
}

/**
 * Updates a user in the 'user' table based on a specific field and value.
 * @param {string} name - The name of the field to match.
 * @param {any} valueMatch - The value to match against the field.
 * @param {Object} updateValues - The values to update.
 * @returns {Promise<void>} - Resolves if the update is successful.
 * @throws {Error} - If an error occurs during the operation.
 */
export async function updateUserFromFieldMatch(name, valueMatch, updateValues) {
  if (!name || !valueMatch || !updateValues) throw new Error('Missing required fields');
  try {
    const { error } = await supabase.from('user').update(updateValues).eq(name, valueMatch);
    if (error) throw new Error('error');
   
  } catch (error) {
    throw new Error('Error occurred during user update');
  }
}

/**
 * Matches two fields in the 'user' table based on email and username.
 * @param {string} email - The email to match.
 * @param {string} user_name - The username to match.
 * @returns {Promise<User|null>} - The user if found, null otherwise.
 * @throws {Error} - If an error occurs during the operation.
 */
export async function matchTwoFieldsAsync(email, user_name) {
  if (!email || !user_name) throw new Error('Missing required fields');
  try {
    return await supabase
      .from('user')
      .select('*')
      .or(
        { 'email.eq': email, 'user_name.eq': null },
        { 'user_name.eq': user_name, 'email.eq': null }
      );
      } catch (error) {
    throw error;
  }
}

/**
 * Retrieves a user from the 'user' table based on two fields and their respective values.
 * @param {string} name - The name of the first field to match.
 * @param {any} valueMatch - The value to match against the first field.
 * @param {string} secondName - The name of the second field to match.
 * @param {any} secondValueMatch - The value to match against the second field.
 * @returns {Promise<User|null>} - The user if found, null otherwise.
 * @throws {Error} - If an error occurs during the operation.
 */
export async function getUserFromTwoFieldsMatchAsync(name, valueMatch, secondName, secondValueMatch) {
  try {
    const { user, error } = await supabase.from('user').select('*').or(name.toLowerCase() + '.eq.' + valueMatch, secondName.toLowerCase() + '.eq.' + secondValueMatch);
    if (error) throw error;
    else return user;
  } catch (error) {
    throw error;
  }
} 