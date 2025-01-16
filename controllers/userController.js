const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

// Create User
exports.createUser = async (req, res) => {
      try{
      const { name, email, password } = req.body;
        // Server-side validation for input fields

      if (!name || !email || !password) {
          return res.status(400).json({ error: 'All fields are required' });
      }
        // Validate that the name only contains letters

      if (!/^[a-zA-Z\s]+$/.test(name)) {
          return res.status(400).json({ error: 'Name must only contain letters' });
      }
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get All Users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get User By ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update User
exports.updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        // Validate that the name only contains letters

        if (name && !/^[a-zA-Z\s]+$/.test(name)) {
            return res.status(400).json({ error: 'Name must only contain letters' });
        }
        // Validate the email format
        if (email && !/.+@.+\..+/.test(email)) {
            return res.status(400).json({ error: 'Email must be valid' });
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, 'secretKey', {
            expiresIn: '1h', // Token expiration time (1 hour)
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};