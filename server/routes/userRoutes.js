import express from 'express';
import { getUsers, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin as adminCheck } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, adminCheck, getUsers);

router.route('/profile')
  .put(protect, updateUserProfile);

export default router;
