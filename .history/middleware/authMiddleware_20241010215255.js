const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization');

  // Check if no token is provided
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the same secret key used when the token was created
    const decoded = jwt.verify(token, 'secretKey'); // Replace 'secretKey' with your actual secret key

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Call next() to proceed to the route handler
    next();
  } catch (err) {
    // If token verification fails, send an error response
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
