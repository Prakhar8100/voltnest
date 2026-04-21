import Booking from '../models/Booking.js';
import Slot from '../models/Slot.js';
import Station from '../models/Station.js';

export const createBooking = async (req, res, next) => {
  try {
    const { stationId, slotId, date, startTime, endTime, chargerType, vehicleInfo, totalCost } = req.body;

    const station = await Station.findById(stationId);
    if (!station) {
      return res.status(404).json({ success: false, message: 'Station not found' });
    }

    // Removed strict slot lookup dependency so bookings can flexibly use string identifiers

    const booking = await Booking.create({
      userId: req.user.id,
      stationId,
      slotId,
      date,
      startTime,
      endTime,
      chargerType,
      vehicleInfo,
      totalCost,
    });

    try {
      const User = (await import('../models/User.js')).default;
      const sendEmail = (await import('../utils/sendEmail.js')).default;
      const user = await User.findById(req.user.id);
      
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px; background-color: #0a1118; color: white;">
          <h2 style="color: #00e676; text-align: center;">VoltNest Confirmation</h2>
          <p>Hi ${user.name}, your charging session is booked!</p>
          <div style="background-color: #1a222c; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Station:</strong> ${station.name}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${startTime} - ${endTime}</p>
            <p><strong>Cost:</strong> $${totalCost}</p>
          </div>
          <p style="text-align: center; color: #888;">Drive safely!</p>
        </div>
      `;

      await sendEmail({
        email: user.email,
        subject: `VoltNest Booking Confirmed - ${station.name}`,
        message: `Your booking at ${station.name} is confirmed for ${startTime}.`,
        html: emailHtml
      });
    } catch(emailErr) {
      console.log('Could not send booking receipt email:', emailErr);
    }

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate('stationId', 'name address');
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

export const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate('userId', 'name email').populate('stationId', 'name');

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Check user
    if (booking.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized to cancel this booking' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    if (!['upcoming', 'active', 'completed', 'cancelled'].includes(status)) {
       return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    booking.status = status;
    
    // Check user ownership
    if (booking.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized to update this booking' });
    }

    if (status === 'completed' && booking.isModified('status')) {
       // Gamification: Award points and add ecoBadge logic
       const User = (await import('../models/User.js')).default;
       const user = await User.findById(booking.userId);
       
       if (user) {
         // Award 50 points per completed session
         user.voltPoints = (user.voltPoints || 0) + 50;

         // Unlock Eco Pioneer badge if reaching threshold (e.g. 500 points)
         if (user.voltPoints >= 500 && !user.ecoBadges.includes('Eco Pioneer')) {
            user.ecoBadges.push('Eco Pioneer');
         }
         if (user.voltPoints >= 200 && !user.ecoBadges.includes('Regular Charger')) {
            user.ecoBadges.push('Regular Charger');
         }

         await user.save({ validateBeforeSave: false });
       }
    }

    await booking.save();

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};
