const express = require('express');
const User = require('../models/User');

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
    });
  }
});

/* POST: Create a new user */
router.post('/', async (req, res) => {
  try {
    const { name, email, role } = req.body;

    if (!name?.trim() || !email?.trim() || !role) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and role are required',
      });
    }

    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role,
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists',
      });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create user',
    });
  }
});

/* PUT: Update an existing user */
router.put('/:id', async (req, res) => {
  try {
    const { name, email, role } = req.body;

    if (!name?.trim() || !email?.trim() || !role) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and role are required',
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user,
    });
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID or user data',
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update user',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      user,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
    });
  }
});


module.exports = router;