import Station from '../models/Station.js';

export const getStations = async (req, res, next) => {
  try {
    const { city, chargerType, available } = req.query;
    let query = {};

    if (city) query.city = new RegExp(city, 'i');
    if (chargerType) query.chargerTypes = { $in: [chargerType] };
    if (available === 'true') query.isActive = true; // Assume isActive implies available for now

    const stations = await Station.find(query);

    res.status(200).json({
      success: true,
      count: stations.length,
      data: stations,
    });
  } catch (error) {
    next(error);
  }
};


export const getStation = async (req, res, next) => {
  try {
    const station = await Station.findById(req.params.id);

    if (!station) {
      return res.status(404).json({ success: false, message: 'Station not found' });
    }

    res.status(200).json({
      success: true,
      data: station,
    });
  } catch (error) {
    next(error);
  }
};

export const createStation = async (req, res, next) => {
  try {
    
    req.body.ownerId = req.user.id;

    const station = await Station.create(req.body);

    res.status(201).json({
      success: true,
      data: station,
    });
  } catch (error) {
    next(error);
  }
};


export const updateStation = async (req, res, next) => {
  try {
    let station = await Station.findById(req.params.id);

    if (!station) {
      return res.status(404).json({ success: false, message: 'Station not found' });
    }

  
    if (station.ownerId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'User not authorized to update this station' });
    }

    station = await Station.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: station,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStation = async (req, res, next) => {
  try {
    const station = await Station.findById(req.params.id);

    if (!station) {
      return res.status(404).json({ success: false, message: 'Station not found' });
    }

    if (station.ownerId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'User not authorized to delete this station' });
    }

    await station.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
