import express from 'express';
import { verifyToken } from '../ultils/verifyUser.js';
import { createPost, deletePost, getPosts, updatePost } from '../controller/post.controller.js';


const router = express.Router();

router.post('/create', verifyToken, createPost);
router.get('/getposts', getPosts);
router.delete('/delete-post/:postId/:userId', verifyToken, deletePost)
router.put('/update-post/:postId/:userId', verifyToken, updatePost)


export default router;