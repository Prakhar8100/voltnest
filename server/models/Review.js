import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Please add a rating between 1 and 5'],
    },
    title: {
      type: String,
      trim: true,
      required: [true, 'Please add a title for the review'],
      maxlength: 100,
    },
    text: {
      type: String,
      required: [true, 'Please add some text'],
    },
    station: {
      type: mongoose.Schema.ObjectId,
      ref: 'Station',
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent user from submitting more than one review per station
reviewSchema.index({ station: 1, user: 1 }, { unique: true });

// Static method to get avg rating and save
reviewSchema.statics.getAverageRating = async function (stationId) {
  const obj = await this.aggregate([
    {
      $match: { station: stationId },
    },
    {
      $group: {
        _id: '$station',
        averageRating: { $avg: '$rating' },
      },
    },
  ]);

  try {
    await this.model('Station').findByIdAndUpdate(stationId, {
      rating: obj[0] ? obj[0].averageRating.toFixed(1) : 0,
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageRating after save
reviewSchema.post('save', function () {
  this.constructor.getAverageRating(this.station);
});

// Call getAverageRating before remove
reviewSchema.pre('deleteOne', { document: true, query: false }, function () {
  this.constructor.getAverageRating(this.station);
});

export default mongoose.model('Review', reviewSchema);
