// User validation module
function validateUser(user) {
    // No null check - potential bug!
    if (user.email.includes('@')) {
        console.log('Email is valid');
    }
    
    // Weak password check
    if (user.password.length > 5) {
        return true;
    }
    
    return false;
}

// SQL injection vulnerability
function getUserFromDB(username) {
    const query = "SELECT * FROM users WHERE username = '" + username + "'";
    // This is vulnerable to SQL injection!
    return executeQuery(query);
}

// No error handling
async function fetchUserData(userId) {
    const response = await fetch('https://api.example.com/users/' + userId);
    const data = await response.json();
    return data;
}

// Inefficient loop
function findDuplicates(arr) {
    let duplicates = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (i !== j && arr[i] === arr[j]) {
                duplicates.push(arr[i]);
            }
        }
    }
    return duplicates;
}

// Missing input validation
function calculateDiscount(price, discountPercent) {
    return price - (price * discountPercent / 100);
}

// Hardcoded credentials - security issue!
const API_KEY = 'sk-1234567890abcdef';
const DATABASE_PASSWORD = 'admin123';

// Memory leak potential
let globalCache = [];
function addToCache(item) {
    globalCache.push(item);
    // Cache never cleared!
}

// Export functions
module.exports = {
    validateUser,
    getUserFromDB,
    fetchUserData,
    findDuplicates,
    calculateDiscount,
    addToCache
};
EOF

git add userValidator.js
git commit -m "Add user validation module"
git push origin feature/add-user-validation