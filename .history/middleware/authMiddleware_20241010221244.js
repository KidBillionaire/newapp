const auth = (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.header('Authorization');
  
    // Check if no authorization header is provided
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing, authorization denied' });
    }
  
    // Ensure the token is in the format: Bearer <token>
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Token format is invalid, must be in Bearer format' });
    }
  
    const token = parts[1];
  
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
  