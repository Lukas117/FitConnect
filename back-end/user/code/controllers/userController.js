import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';
import crypto, { scrypt } from 'crypto';


const supabaseUrl = "https://nhrrgnjkvzxceshaiwih.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ocnJnbmprdnp4Y2VzaGFpd2loIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDc0MjIxMSwiZXhwIjoyMDE2MzE4MjExfQ.iKmh3-Zlka-WfYDrG0-DcS_WCW6gIEqz5XPIbw4rF9o"
const supabase = createClient(supabaseUrl, supabaseKey);

const errorStrings = {
  500: 'Internal Server Error'
}

const array = {}

function log(code, message) {
  console.log(code, message);
  Array.prototype.push.apply(array, {Id: array.length + 1, Code: code, Message: message})
}

/**
 * 
 * @param {String} name 
 * @param {String} user_name 
 * @param {Date} birth_date 
 * @param {String} email
 * @param {String} password
 * @returns [User | null] If user is created, returns, else returned null.
 * @returns [Error | null] If errored, returns, else returned null.
 */
async function makeUserAsync(name, user_name, birth_date, email, password) {
  const newUser = {
    name,
    user_name,
    birth_date,
    email,
    password_salt: null,
    password_hash: null
  };

  newUser.password_salt = crypto.randomBytes(16).toString('hex');
  newUser.password_hash = makePasswordAsync(password, newUser.password_salt);
  
  const { user, makeUserError } = await supabase
  .from('user')
  .upsert([newUser]);

  if (makeUserError) throw makeUserError;
  else return user;
}

async function matchTwoFieldsAsync(email, user_name) {
  return await supabase
    .from('user')
    .select('*')
    .or('email.eq.' + email, 'user_name.eq.' + user_name);
}

const cpuMCP = 16384; 
const hashLength = 128;

function makePasswordAsync(password, password_salt) {
  log("Runtime", "Creating user password");
  const passwordBuffer = Buffer.from(password).toString('hex');
  const saltBufferr = Buffer.from(password_salt).toString('hex');

  log("Runtime", "Hashing user password");

  let password_hash
  try {
    password_hash = crypto.scrypt(passwordBuffer, saltBufferr, hashLength, function(err, derivedKey){
      if (err) throw err;
      else return derivedKey.toString('hex');
    })
  } catch (error) {
    log("Error", error.message);
  }

  log("Runtime", "Hased user password: " + password_hash);

  return password_hash;
}

function matchPassword(hashed_password, password, salt) {
  const passwordBuffer = Buffer.from(password).toString('hex');
  const saltBufferr = Buffer.from(salt).toString('hex');

  let password_hash
  try {
    password_hash = crypto.scrypt(passwordBuffer, saltBufferr, hashLength, function(err, derivedKey){
      if (err) throw err;
      else return derivedKey.toString('hex');
    })
  } catch (error) {
    log("Error", error.message);
  }

  log("Runtime", "Hased user password: " + password_hash);

  return password_hash == hashed_password;
}

/**
 * 
 * @param {String} name 
 * @param {any} valueMatch 
 * @returns [User | null] If user is found, returns, else returned null.
 * @returns [Error | null] If errored, returns, else returned null.
 */
async function getUserFromFieldAndValueAsync(name, valueMatch) {
  try {
    const { user, error } = await supabase.from('user').select('*').eq(name, valueMatch);
    if (error) throw error;
    else return user, null;
  } catch (error) {
    return null, error;
  }
}

/**
 * 
 * @param {String} name 
 * @param {any} valueMatch 
 * @param {Array<String>} updateValues 
 * @returns [Error | null] If errored, return, else return null.
 */
async function updateUserFromFieldMatch(name, valueMatch, updateValues) {
  try {
    const { error } = await supabase.from('user').update(updateValues).eq(name, valueMatch);
    if (error) throw error;
  } catch (error) {
    return error;
  }
}

export async function register(req, res) {
  log("Runtime", "Registering user");
  const { name, user_name, birth_date, email, password } = req.body;
  if (!name || !user_name || !birth_date || !email || !password) return res.status(400);

  let user, getUserError = getUserFromFieldAndValueAsync("user_name", user_name);
  if (getUserError) log("Error", getUserError.message);

  if (!user) {
    log(400, 'Error checking existing users: Email or user_name has already been taken.');

    user = makeUserAsync(name, user_name, birth_date, email, password);
    if (!user) throw new Error('Error creating user.');
  }

  const token = jwt.sign({ userId: user.user_id }, 'wompwomp', { expiresIn: '24h' });
  
  return res.status(200).json({ user, token });
}

export async function getUserFromId(req, res) {
  // Logic for fetching a user by userId
  const userId = req.params.id;

  if (userId) {
    let user, getUserError = await getUserFromFieldAndValueAsync('id', userId);
    if (getUserError) log("Error", getUserError.message);

    if (!user) { 
      log(404, "Couldn't find user with id: " + toString(userId)); 
      return res.status(404).json({ userId: userId }); 
    }

    return res.status(200).json(user);
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email && !password) {
    log(400, "Email and password is required.");
    return req.status(400).json({ error: "Email and password is required."});
  }

    let user, getUserError = await getUserFromFieldAndValueAsync('email', email);
    if (getUserError) { log("Error", getUserError.message) }

    if (!user) {
      log(404, "Email or password is not valid.");
      return req.status(404).json({ error: "Email or password is not valid."});
    }

    let passwordMatched = matchPassword(user.password_hash, password, user.password_salt);
    if (!passwordMatched) {
      log(404, "Email or password is not valid.");
      return req.status(404).json({ error: "Email or password is not valid."});
    }

    const token = jwt.sign({ userId: user.Id }, 'wompwomp', { expiresIn: '24h' });

    return res.status(200).json({ user, token });

}


export async function addSportList(req, res) {
  const { sport_list, email } = req.body;
  console.log(sport_list);
  console.log(email);

  if (!sport_list || !email) {
    log(400, "Sport list and email is required.");
    return req.status(400).json({ error: "Sport list and email is required."});
  }

  const { error } = await updateUserFromFieldMatch('email', email, { sport_list: sport_list })
  if (error) {
    log(404, "Error updating user from field match.");
    return req.status(500).json({ error: error.message});
  }
  return res.status(201).json({ sport: sport_list });
};
