import express from 'express';
// import { deleteUser, getUsers, signOut, test, updateUser } from '../controller/user.controller.js';
import { verifyToken } from '../ultils/verifyUser.js';
import { createComment } from '../controller/comment.controller.js';

const router = express.Router();

router.post('/create',verifyToken,  createComment);
// router.put('/update/:userId', verifyToken,  updateUser)
// router.delete('/delete/:userId', verifyToken,  deleteUser)
// router.post('/sign-out', signOut);
// router.get('/get-users', verifyToken, getUsers);

export default router;