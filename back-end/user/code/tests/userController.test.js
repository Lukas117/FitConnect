import {
    makeUserAsync,
    makePasswordAsync,
    matchPassword,
    getUserFromFieldAndValueAsync,
    updateUserFromFieldMatch,
    matchTwoFieldsAsync,
    getUserFromTwoFieldsMatchAsync,
} from '../controllers/userFunctions.js';
import { createClient } from '@supabase/supabase-js';

jest.mock('@supabase/supabase-js', () => ({
    createClient: jest.fn().mockReturnValue({
        from: jest.fn().mockReturnThis(),
        upsert: jest.fn().mockResolvedValue({ data: {}, error: null }),
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({
            data: [{
                id: 1,
                name: 'John Doe',
                user_name: 'johndoe',
                email: 'johndoe@example.com',
                hashedPassword:  "password",
                birth_date: new Date(),
                password_salt: 'salt',
            }],
        }),
        update: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
          }),
          or: jest.fn().mockResolvedValue({
            data: [
              {
                id: 1,
                name: 'John Doe',
                user_name: 'johndoe',
                email: 'johndoe@example.com',
              },
            ],
            error: null,
          }),
        }),
    }),
)

describe('User Functions', () => {
    describe('makeUserAsync', () => {
        it('should create a new user', async () => {
            const newUser = await makeUserAsync('John Doe', 'johndoe', new Date(), 'johndoe@example.com', 'password');
            expect(newUser).toBeDefined();
            expect(newUser.name).toBe('John Doe');
            expect(newUser.user_name).toBe('johndoe');
            expect(newUser.email).toBe('johndoe@example.com');
        });

        it('should throw an error if an error occurs during user creation', async () => {
            await expect(makeUserAsync('', '', null, '', '')).rejects.toThrow();
        });
    });

    describe('makePasswordAsync', () => {
        it('should generate a password hash', async () => {
            const password = 'password';
            const salt = 'salt';
            const passwordHash = await makePasswordAsync(password, salt);
            expect(passwordHash).toBeDefined();
            expect(typeof passwordHash).toBe('string');
        });

        it('should throw an error if an error occurs during password hashing', async () => {
            await expect(makePasswordAsync('', '')).rejects.toThrow();
        });
    });

    describe('matchPassword', () => {
        it('should return true if the passwords match', async () => {
            const password = 'password';
            const salt = 'salt';
            const hashedPassword = await makePasswordAsync(password, salt); 
            const result = await matchPassword(hashedPassword, password, salt);
            expect(result).toBe(true);
        });

        it('should return false if the passwords do not match', async () => {
            const hashedPassword = 'hashedPassword';
            const password = 'wrongPassword';
            const salt = 'salt';
            const result = await matchPassword(hashedPassword, password, salt);
            expect(result).toBe(false);
        });
    });

    describe('getUserFromFieldAndValueAsync', () => { 
        it('should retrieve a user if found', async () => {
            const fieldName = 'email';
            const valueMatch = 'johndoe@example.com';
            const user = await getUserFromFieldAndValueAsync(fieldName, valueMatch);
            expect(user).toBeDefined();
            expect(user.email).toBe(valueMatch);
        });

        it('should return null if no user is found', async () => {
            const fieldName = 'email';
            const valueMatch = 'nonexistent@example.com';
            const user = await getUserFromFieldAndValueAsync(fieldName, valueMatch);
            expect(user).toBeNull();
        });

    });

    describe('updateUserFromFieldMatch', () => {
        it('should update a user if a match is found', async () => {
            const fieldName = 'email';
            const valueMatch = 'johndoe@example.com';
            const updateValues = { name: 'John Doe Updated' };
            await expect(updateUserFromFieldMatch(fieldName, valueMatch, updateValues)).resolves.toBeUndefined();
        });

    });

    describe('matchTwoFieldsAsync', () => {
        it('should retrieve a user if a match is found', async () => {
          const email = 'johndoe@example.com';
          const user_name = 'johndoe';
          const result = await matchTwoFieldsAsync(email, user_name);
          expect(result.data.length).toBe(1); 
          const user = result.data[0];
          expect(user.email).toBe(email);
          expect(user.user_name).toBe(user_name);
        });
    }
    );
});
