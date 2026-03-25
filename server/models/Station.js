import mongoose from 'mongoose';

const stationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a station name'],
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
    },
    city: {
      type: String,
      required: [true, 'Please add a city'],
    },
    coordinates: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
    chargerTypes: {
      type: [String],
      enum: ['AC', 'DC', 'Fast'],
      required: true,
    },
    totalSlots: {
      type: Number,
      required: true,
      default: 0,
    },
    pricePerKwh: {
      type: Number,
      required: true,
    },
    amenities: {
      type: [String],
    },
    images: {
      type: [String],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    ownerId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Station', stationSchema);
