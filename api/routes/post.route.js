import express from 'express';
import { verifyToken } from '../ultils/verifyUser.js';
import { createPost, deletePost, getPosts } from '../controller/post.controller.js';


const router = express.Router();

router.post('/create', verifyToken, createPost);
router.get('/getposts', getPosts);
router.delete('/delete-post/:postId/:userId', verifyToken, deletePost)


export default router;