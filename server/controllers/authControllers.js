const User = require('../models/User');
const jwt = require ("jsonwebtoken");

class AuthController {
  static async register(req, res) {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      // Create new user
      const userId = await User.create(email, password);
      res.status(201).json({ 
        message: 'User registered successfully',
        userId 
      });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      // Verify password
      const validPassword = await User.verifyPassword(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: 'Invalid password' });
      }

      // Generate token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        'your_jwt_secret',
        { expiresIn: '24h' }
      );

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
}

module.exports = AuthController;