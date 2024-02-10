import express from 'express';
import { verifyToken } from '../ultils/verifyUser.js';
import { createPost } from '../controller/post.controller.js';


const router = express.Router();

router.post('/create', verifyToken, createPost);
// router.put('/update/:userId', verifyToken,  updateUser)
// router.delete('/delete/:userId', verifyToken,  deleteUser)
// router.post('/sign-out', signOut)

export default router;