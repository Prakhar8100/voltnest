import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  stationId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Station',
    required: true,
  },
  slotNumber: {
    type: String,
    required: true,
  },
  chargerType: {
    type: String,
    enum: ['AC', 'DC', 'Fast'],
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'booked', 'charging', 'maintenance'],
    default: 'available',
  },
  currentBookingId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Booking',
  },
});

export default mongoose.model('Slot', slotSchema);
