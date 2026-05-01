import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';
import simulateChargers from './utils/chargerSimulator.js';

import authRoutes from './routes/authRoutes.js';
import stationRoutes from './routes/stationRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectDB();
simulateChargers();

const app = express();


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cors());


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


app.use('/api/auth', authRoutes);
app.use('/api/stations', stationRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);

const __dirname = path.resolve();

// Priority 1: Serve static files from the frontend build (Production)
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../client/dist');
  app.use(express.static(distPath));

  app.get('*', (req, res) => {
    if (!req.url.startsWith('/api')) {
      const indexPath = path.join(distPath, 'index.html');
      // Check if index.html exists before sending
      res.sendFile(indexPath, (err) => {
        if (err) {
          res.status(200).send('VoltNest API is running (Frontend build not found)');
        }
      });
    } else {
      res.status(404).json({ success: false, message: 'API Route Not Found' });
    }
  });
} else {
  // Priority 2: Health Check / Root (Development)
  app.get('/', (req, res) => {
    res.send('VoltNest API is running in development mode...');
  });
}

// Fallback for root if not handled above (e.g. production but accessing /)
app.get('/', (req, res) => {
  res.send('VoltNest API is running...');
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);


process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);

  server.close(() => process.exit(1));
});
