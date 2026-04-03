import User from '../models/User.js';
import Admin from '../models/Admin.js';
import Station from '../models/Station.js';
import generateToken from '../utils/generateToken.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role, phone, vehicle, profileImage, stationDetails } = req.body;

    const Model = role === 'admin' ? Admin : User;
    
    const userExistsInUsers = await User.findOne({ email });
    const userExistsInAdmins = await Admin.findOne({ email });

    if (userExistsInUsers || userExistsInAdmins) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    const userData = {
      name,
      email,
      password,
      role: role === 'admin' ? 'admin' : 'user',
      phone,
      profileImage,
    };
    if (role !== 'admin') {
      userData.vehicle = vehicle;
    }

    const user = await Model.create(userData);

    if (user && role === 'admin' && stationDetails) {
      await Station.create({
        name: stationDetails.name,
        address: stationDetails.address,
        city: stationDetails.city,
        coordinates: {
          lat: parseFloat(stationDetails.lat || 0),
          lng: parseFloat(stationDetails.lng || 0)
        },
        chargerTypes: stationDetails.chargerTypes || ['AC'],
        totalSlots: parseInt(stationDetails.totalSlots || 1),
        pricePerKwh: parseFloat(stationDetails.pricePerKwh || 0),
        images: stationDetails.images || [],
        amenities: stationDetails.amenities || [],
        ownerId: user._id,
      });
    }

    if (user) {
      res.status(201).json({
        success: true,
        data: {
          _id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          profileImage: user.profileImage,
          token: generateToken(user._id, user.role),
        },
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid user data' });
    }
  } catch (error) {
    next(error);
  }
};


export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check regular users first
    let foundUser = await User.findOne({ email }).select('+password');
    let isMatch = false;

    if (foundUser) {
      isMatch = await foundUser.matchPassword(password);
      if (isMatch) {
         return res.json({
           success: true,
           data: {
             _id: foundUser.id,
             name: foundUser.name,
             email: foundUser.email,
             role: foundUser.role,
             profileImage: foundUser.profileImage,
             token: generateToken(foundUser._id, foundUser.role),
           },
         });
      }
    }

    // If not found in users or password failed, check admins
    foundUser = await Admin.findOne({ email }).select('+password');
    if (foundUser) {
      isMatch = await foundUser.matchPassword(password);
      if (isMatch) {
        return res.json({
          success: true,
          data: {
            _id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            role: foundUser.role,
            profileImage: foundUser.profileImage,
            token: generateToken(foundUser._id, foundUser.role),
          },
        });
      }
    }

    // If neither matched
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Forgot password
// @route   POST /api/v1/auth/forgotpassword
// @access  Public
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      user = await Admin.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'There is no user with that email' });
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset url
    const resetUrl = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Password reset token',
        message,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px;">
            <h2 style="color: #00d4ff; text-align: center;">VoltNest Password Reset</h2>
            <p>You requested a password reset for your VoltNest account.</p>
            <p>Please click the button below to reset your password. This link will expire in 10 minutes.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background-color: #00d4ff; color: #0a1118; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
            </div>
            <p>If you did not request this, please ignore this email.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #888; text-align: center;">&copy; 2026 VoltNest. All rights reserved.</p>
          </div>
        `,
      });

      res.status(200).json({ success: true, data: 'Email sent' });
    } catch (err) {
      console.log(err);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return res.status(500).json({ success: false, message: 'Email could not be sent' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Reset password
// @route   PUT /api/v1/auth/resetpassword/:resettoken
// @access  Public
export const resetPassword = async (req, res, next) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resettoken)
      .digest('hex');

    let user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      user = await Admin.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });
    }

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid token' });
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      data: {
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      },
    });
  } catch (error) {
    next(error);
  }
};
