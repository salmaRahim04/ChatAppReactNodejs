// routes/followers.js
import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';
import User from '../models/user.js';

// Follow a user
router.post('/follow/:id', async (req, res) => {
  try {
    console.log(req.params.id,req)
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);
    

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (currentUser.following.includes(userToFollow._id)) {
      return res.status(400).json({ message: 'You are already following this user' });
    }

    currentUser.following.push(userToFollow._id);
    userToFollow.followers.push(currentUser._id);

    await currentUser.save();
    await userToFollow.save();

    res.json({ message: 'You are now following this user' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
