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

const router = express.Router();

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
