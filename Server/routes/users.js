import express from 'express';
import {signin,signup,getUser,EditUser, getUsers} from '../controllers/user.js';

const router = express.Router();

router.post('/signin',signin);
router.post('/signup',signup);
router.get('/:id',getUser);
router.get('/',getUsers);
router.post('/editedUser/:id',EditUser);

export default router;