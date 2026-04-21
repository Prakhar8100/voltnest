import express from 'express';
import {
  getStations,
  getStation,
  createStation,
  updateStation,
  deleteStation,
} from '../controllers/stationController.js';

import { protect } from '../middleware/authMiddleware.js';
import { admin as adminCheck } from '../middleware/adminMiddleware.js';

import reviewRouter from './reviewRoutes.js';

const router = express.Router();

// Re-route into other resource routers
router.use('/:stationId/reviews', reviewRouter);

router
  .route('/')
  .get(getStations)
  .post(protect, adminCheck, createStation);

router
  .route('/:id')
  .get(getStation)
  .put(protect, adminCheck, updateStation)
  .delete(protect, adminCheck, deleteStation);

export default router;
