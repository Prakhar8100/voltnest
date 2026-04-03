import User from '../models/User.js';


export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};


export const updateUserProfile = async (req, res, next) => {
  try {
    const user = req.user;

    if (user) {
      user.name = req.body.name || user.name;
      user.phone = req.body.phone || user.phone;
      
      if (req.body.profileImage) {
        user.profileImage = req.body.profileImage;
      }

      if (req.body.vehicle) {
        user.vehicle = {
          model: req.body.vehicle.model || user.vehicle?.model,
          licensePlate: req.body.vehicle.licensePlate || user.vehicle?.licensePlate,
        };
      }

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.status(200).json({
        success: true,
        data: {
          _id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          phone: updatedUser.phone,
          profileImage: updatedUser.profileImage,
          vehicle: updatedUser.vehicle,
        },
      });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
};
