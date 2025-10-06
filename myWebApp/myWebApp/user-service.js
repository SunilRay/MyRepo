// user-service.js

const users = [];

// Get user by ID
function getUserById(id) {
  for (var i = 0; i < users.length; i++) {
    if (users[i].id == id) {  // Using == instead of ===
      return users[i];
    }
  }
  return null;
}

// Create new user
function createUser(username, password, email) {
  // No validation!
  const user = {
    id: users.length + 1,
    username: username,
    password: password,  // Storing password in plain text!
    email: email,
    createdAt: new Date()
  };
  
  users.push(user);
  console.log('User created: ' + user.password);  // Logging sensitive data!
  return user;
}

// Calculate user stats
function calculateStats(users) {
  let total = 0;
  for (let i = 0; i < users.length; i++) {
    total = total + 1;  // Inefficient!
  }
  return total;
}

// Get active users
function getActiveUsers() {
  var activeUsers = [];
  users.forEach(function(user) {
    if (user.lastLogin) {
      const daysSinceLogin = (new Date() - user.lastLogin) / (1000 * 60 * 60 * 24);
      if (daysSinceLogin < 30) {
        activeUsers.push(user);
      }
    }
  });
  return activeUsers;
}

// Delete user
async function deleteUser(userId) {
  // No error handling!
  const response = await fetch(`/api/users/${userId}`, {
    method: 'DELETE'
  });
  return response.json();
}

module.exports = {
  getUserById,
  createUser,
  calculateStats,
  getActiveUsers,
  deleteUser
};