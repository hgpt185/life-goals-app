// Script to generate a secure JWT secret
const crypto = require('crypto');

// Generate a 256-bit (32 bytes) secret key
const secret = crypto.randomBytes(32).toString('base64');

console.log('Generated JWT Secret:');
console.log(secret);
console.log('\nUse this secret in your production environment variables.');
console.log('Keep it secure and never commit it to version control!'); 