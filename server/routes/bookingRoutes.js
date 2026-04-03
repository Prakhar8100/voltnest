import express from 'express';
import {
  createBooking,
  getMyBookings,
  getBookings,
  cancelBooking,
  updateBookingStatus,
} from '../controllers/bookingController.js';

import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createBooking)
  .get(protect, admin, getBookings);

router.route('/my').get(protect, getMyBookings);

router.route('/:id/cancel').patch(protect, cancelBooking);
router.route('/:id/status').patch(protect, updateBookingStatus);

export default router;
