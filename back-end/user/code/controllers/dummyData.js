// dummyData.js
export function generateDummyUser() {
    const userId = generateRandomUserId();
    const createdAt = new Date().toISOString();
  
    return {
      userId,
      firstName: 'John',
      lastName: 'Doe',
      username: 'john_doe',
      email: 'john@example.com',
      birthDate: '1990-01-01',
      passwordHash: 'hashed_password_here',
      passwordSalt: 'password_salt_here',
      createdAt,
      profilePic: 'path/to/profile_picture.jpg',
      friendList: ['friend1', 'friend2', 'friend3'],
      friendRequests: ['request1', 'request2'],
      sportList: ['sport1', 'sport2', 'sport3'],
    };
  }
  
  function generateRandomUserId() {
    // You can use a library like uuid to generate a unique user ID
    // For simplicity, we'll use a basic random string in this example
    return Math.random().toString(36).substring(7);
  }
  
  // Generate 5 dummy users
  export const dummyUsers = Array.from({ length: 5 }, () => generateDummyUser());
  