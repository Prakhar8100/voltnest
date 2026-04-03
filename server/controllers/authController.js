import User from '../models/User.js';
import Admin from '../models/Admin.js';
import Station from '../models/Station.js';
import generateToken from '../utils/generateToken.js';

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role, phone, vehicle, profileImage, stationDetails } = req.body;

    const Model = role === 'admin' ? Admin : User;
    
    const userExists = await Model.findOne({ email });

    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
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

    let user = await User.findOne({ email }).select('+password');
    let isMatch = false;

    if (user) {
      isMatch = await user.matchPassword(password);
    } else {
      user = await Admin.findOne({ email }).select('+password');
      if (user) {
        isMatch = await user.matchPassword(password);
      }
    }

    if (!user || !isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    res.json({
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
