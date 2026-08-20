const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // 1. Get token from the header (Bearer Token format)
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1]; 

  // 2. Check if no token is found
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }

  // 3. Verify token using your secret key
  try {
    // Make sure you have JWT_SECRET in your .env file
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_fallback_secret_key');
    
    // Attach user payload to the request object
    req.user = decoded.user || decoded; 
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Token is not valid or expired' });
  }
};