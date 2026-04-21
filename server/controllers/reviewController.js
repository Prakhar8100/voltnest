import Review from '../models/Review.js';
import Station from '../models/Station.js';

// @desc    Get reviews for a station
// @route   GET /api/stations/:stationId/reviews
// @access  Public
export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ station: req.params.stationId }).populate({
      path: 'user',
      select: 'name profileImage',
    });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Add review
// @route   POST /api/stations/:stationId/reviews
// @access  Private (User)
export const addReview = async (req, res, next) => {
  try {
    req.body.station = req.params.stationId;
    req.body.user = req.user.id;

    const station = await Station.findById(req.params.stationId);

    if (!station) {
      return res.status(404).json({ success: false, message: 'Station not found' });
    }

    const review = await Review.create(req.body);

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'You have already submitted a review for this station' });
    }
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
