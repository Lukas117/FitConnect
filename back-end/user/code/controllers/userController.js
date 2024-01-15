import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const supabaseUrl = 'https://nhrrgnjkvzxceshaiwih.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ocnJnbmprdnp4Y2VzaGFpd2loIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDc0MjIxMSwiZXhwIjoyMDE2MzE4MjExfQ.iKmh3-Zlka-WfYDrG0-DcS_WCW6gIEqz5XPIbw4rF9o';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function register(req, res) {
	const { name, user_name, birth_date, email, password_hash } = req.body;

	const newUser = {
		name,
		user_name,
		birth_date,
		email,
		password_hash: null,
		password_salt: null
	};

	try {
		const password_salt = crypto.randomBytes(16).toString('hex');
		const passwordBuffer = Buffer.from(password_hash, 'utf8');
		const saltBuffer = Buffer.from(password_salt, 'hex');
		const N = 16384; // CPU/memory cost parameter
		const r = 8; // block size parameter
		const p = 1; // parallelization parameter
		const dkLen = 64; // derived key length

		// Use the scrypt implementation from the crypto module
		const derivedKey = await new Promise((resolve, reject) => {
			crypto.scrypt(passwordBuffer, saltBuffer, dkLen, (err, derivedKey) => {
				if (err) {
					reject(err);
				} else {
					resolve(derivedKey);
				}
			});
		});

		newUser.password_hash = derivedKey.toString('hex');
		newUser.password_salt = password_salt;

		// Save the new user to the 'users' table in Supabase
		const { data, error } = await supabase.from('user').upsert([newUser]);

		if (error) {
			console.error('Error creating user:', error.message);
			return res.status(500).json({ error: 'Internal Server Error' });
		}

		const { data: user, error: userError } = await supabase
			.from('user')
			.select('*')
			.eq('user_name', newUser.user_name);

		if (userError) {
			console.error('Error fetching user:', userError.message);
			return res.status(500).json({ error: 'Internal Server Error' });
		}

		// Generate JWT token
		const token = jwt.sign({ userId: user.id }, 'wompwomp', {
			expiresIn: '24h'
		});

		res.status(200).json({ user, token });
	} catch (error) {
		console.error('Error creating user:', error.message);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}

export async function getUserById(req, res) {
	// Logic for fetching a user by userId
	const userId = req.params.id;

	try {
		// Fetch the user with the matching userId from the 'users' table
		const { data, error } = await supabase
			.from('user')
			.select('*')
			.eq('userId', userId);

		if (error) {
			console.error('Error fetching user:', error.message);
			return res.status(500).json({ error: 'Internal Server Error' });
		}

		const user = data[0];

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		res.status(200).json(user);
	} catch (error) {
		console.error('Error fetching user:', error.message);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}
export async function login(req, res) {
	// Logic for user login
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ error: 'Email and password are required' });
	}

	try {
		// Fetch the user with the matching email from the 'users' table
		const { data, error } = await supabase
			.from('user')
			.select('*')
			.eq('email', email);

		if (error) {
			console.error('Error fetching user:', error.message);
			return res.status(500).json({ error: 'Internal Server Error' });
		}

		const user = data[0];

		if (!user) {
			return res.status(401).json({ error: 'Invalid credentials' });
		}

		// Verify the password
		const passwordBuffer = Buffer.from(password, 'utf8');
		const saltBuffer = Buffer.from(user.password_salt, 'hex');
		const dkLen = 64; // derived key length

		const derivedKey = await new Promise((resolve, reject) => {
			crypto.scrypt(passwordBuffer, saltBuffer, dkLen, (err, key) => {
				if (err) {
					reject(err);
				} else {
					resolve(key);
				}
			});
		});

		const hashedPassword = derivedKey.toString('hex');

		if (hashedPassword !== user.password_hash) {
			return res.status(401).json({ error: 'Invalid credentials' });
		}

		// Password is valid, generate JWT token
		const token = jwt.sign({ userId: user.id }, 'wompwomp', {
			expiresIn: '24h'
		});

		res.status(200).json({ user, token });
	} catch (error) {
		console.error('Error fetching user:', error.message);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}
