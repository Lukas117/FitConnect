import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const supabaseUrl = "https://nhrrgnjkvzxceshaiwih.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ocnJnbmprdnp4Y2VzaGFpd2loIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDc0MjIxMSwiZXhwIjoyMDE2MzE4MjExfQ.iKmh3-Zlka-WfYDrG0-DcS_WCW6gIEqz5XPIbw4rF9o"
const supabase = createClient(supabaseUrl, supabaseKey);

const errorStrings = {
  500: 'Internal Server Error'
}

function errorResponse(errorCode, errorTitle, errorMessage) {
  console.error('Error ', errorTitle, errorMessage);
  return res.status(errorCode).json({ error: errorStrings[errorCode] });
}

async function userCreateAsync(userData) {
  const { name, user_name, birth_date, email, password_hash } = userData;

  const newUser = {
    name,
    user_name,
    birth_date,
    email,
    password_hash: null,
    password_salt: null,
  };

  try {
    newUser.password_hash, newUser.password_salt = await userPasswordGenerateAsync(password_hash);
  } catch (error) {
    return null, errorResponse(400, 'Password generation: ', error.message);
  }
  
  try {
    const { data, error } = await supabase
      .from('user')
      .upsert([newUser]);

    if (error) throw error
    else return data, null;
  } catch (error) {
    return null, errorResponse(500, 'Error creating user:', error.message);
  }
}

async function userFindEmailUsernameAsync(userData) {
  const { email, user_name } = userData;
  return await supabase
    .from('user')
    .select('*')
    .or('email.eq.' + email, 'user_name.eq.' + user_name);
}

async function userPasswordGenerateAsync(hash, salt) {
  const password_salt = salt ? salt : crypto.randomBytes(16).toString('hex');
  const passwordBuffer = Buffer.from(hash, 'utf8');
  const saltBuffer = Buffer.from(password_salt, 'hex');
  const N = 16384; // CPU/memory cost parameter
  const r = 8; // block size parameter
  const p = 1; // parallelization parameter
  const dkLen = 64; // derived key length

  // Use the scrypt implementation from the crypto module
  const derivedKey = await new Promise((resolve, reject) => {
    crypto.scrypt(passwordBuffer, saltBuffer, dkLen, (err, derivedKey) => {
      if (err) reject(err);
      else resolve(derivedKey);
    });
  });

  return derivedKey.toString('hex'), password_salt;
}

async function getUserFromFieldAsync(name, valueMatch) {
  try {
    const { data, error } = await supabase.from('user').select('*').eq(name, valueMatch);
    if (error) throw error;
    else return data, null
  } catch (error) {
    return null, errorResponse(500, 'Error fetching user:', error.message);
  }
}

async function setUserFieldFromFieldAsync(fieldlist, fieldName, valueMatch) {
  try {
    const { user, error } = await supabase.from('user').select(fieldlist).eq(fieldName, valueMatch);
    if (error) throw error;
    else return user, null
  } catch (error) {
    return null, errorResponse(500, 'Error fetching user:', error.message);
  }
}

export async function userRegister(req, res) {
  let existingUser, existingUserError = await userFindEmailUsernameAsync(req.body);

  if (existingUserError) {
    return errorResponse(500, 'Error checking existing users:', existingUserError.message);
  }

  if (existingUser.length > 0) {
    return errorResponse(400, 'Error checking existing users:', 'Email or user_name has already been taken.');
  }

  let user, userCreationError = await userCreateAsync(req.body);
  if (userCreationError) return userCreationError;

  const token = jwt.sign({ userId: user.id }, 'wompwomp', { expiresIn: '24h' });

  return res.status(200).json({ user, token });
}

export async function getUserFromId(req, res) {
  // Logic for fetching a user by userId
  const userId = req.params.id;

  try {
    let user, userError = await getUserFromFieldAsync('id', userId);
    if (userError) return userError;

    console.log(user[0])

    if (!user) {
      throw {message: 'Could not locate the user based on the id: ' + toString(userId)}
    }

    return res.status(200).json(user);
  } catch (error) {
    return errorResponse(500, 'Error fetching user:', error.message);
  }
}
export async function login(req, res) {
  const { email, password } = req.body;

  if (email && password) {
    const { user, error } = await getUserFromFieldAsync('email', email);
    if (error) return errorResponse(500, 'Error fetching user:', error.message);

    console.log(data[0]);

    if (!user) {
      throw errorResponse(500, 'Error fetching user:', 'Invalid credentials');
    }

    const { password_hash } = await userPasswordGenerateAsync(password, user.password_salt)
    if (password_hash) {
      const token = jwt.sign({ userId: user.id }, 'wompwomp', { expiresIn: '24h' });

      return res.status(200).json({ user, token });
    } else {
      throw errorResponse(500, 'Error fetching user:', 'Invalid credentials');
    }
  } else {
    return errorResponse(400, 'Email and password are required.');
  }
}


export async function addSport(req, res) {
  const { sport_list, email } = req.body;
  console.log(sport_list);
  console.log(email);

  const { user, error } = await setUserFieldFromFieldAsync({ sport_list: sport_list }, 'email', email)
  if (error) return errorResponse(500, 'Error adding sport:', error.message); 
  else return res.status(201).json({ sport: sport_list });
};
