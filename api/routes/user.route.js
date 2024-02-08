import express from 'express';
import { test, updateUser } from '../controller/user.controller.js';
import { verifyToken } from '../ultils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken,  updateUser)

export default router;