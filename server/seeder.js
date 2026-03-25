import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import Station from './models/Station.js';

dotenv.config();

connectDB();

const seedData = async () => {
  try {
  
    await User.deleteMany();
    await Station.deleteMany();

  
    const createdUsers = await User.create([
      {
        name: 'Admin User',
        email: 'admin@voltnest.com',
        password: 'password123',
        role: 'admin',
      },
      {
        name: 'Test Driver',
        email: 'driver@voltnest.com',
        password: 'password123',
        role: 'user',
        vehicle: { model: 'Tesla Model 3', licensePlate: 'EV-2026' }
      }
    ]);

    const adminId = createdUsers[0]._id;

  
    await Station.create([
      {
        name: 'VoltHub Downtown',
        address: '124 Main St, City Center',
        city: 'Metropolis',
        coordinates: { lat: 40.7128, lng: -74.0060 },
        chargerTypes: ['DC', 'Fast'],
        totalSlots: 12,
        pricePerKwh: 0.35,
        rating: 4.8,
        isActive: true,
        images: ['https://images.unsplash.com/photo-1593941707882-a5bba14938cb?auto=format&fit=crop&q=80&w=800'],
        ownerId: adminId
      },
      {
        name: 'EcoCharge Mall',
        address: 'Westside Shopping Complex, Level 2',
        city: 'Metropolis',
        coordinates: { lat: 40.7328, lng: -74.0260 },
        chargerTypes: ['AC', 'DC'],
        totalSlots: 8,
        pricePerKwh: 0.28,
        rating: 4.5,
        isActive: true,
        images: ['https://images.unsplash.com/photo-1620802051790-21b91871a364?auto=format&fit=crop&q=80&w=800'],
        ownerId: adminId
      },
      {
        name: 'Highway 99 QuickCharge',
        address: 'Exit 14A, Interstate 99',
        city: 'Gotham',
        coordinates: { lat: 40.8528, lng: -74.1260 },
        chargerTypes: ['Fast'],
        totalSlots: 4,
        pricePerKwh: 0.45,
        rating: 4.2,
        isActive: false,
        images: ['https://images.unsplash.com/photo-1549445963-3dc40e4f8dcf?auto=format&fit=crop&q=80&w=800'],
        ownerId: adminId
      },
      {
        name: 'TechPark Superchargers',
        address: 'Building 4, Silicon Avenue',
        city: 'San Jose',
        coordinates: { lat: 37.3382, lng: -121.8863 },
        chargerTypes: ['DC', 'Fast'],
        totalSlots: 20,
        pricePerKwh: 0.40,
        rating: 4.9,
        isActive: true,
        images: ['https://images.unsplash.com/photo-1629854746684-2aee379e4912?auto=format&fit=crop&q=80&w=800'],
        ownerId: adminId
      },
      {
        name: 'City Plaza Charging',
        address: 'Underground Parking, Central Plaza',
        city: 'Austin',
        coordinates: { lat: 30.2672, lng: -97.7431 },
        chargerTypes: ['AC'],
        totalSlots: 6,
        pricePerKwh: 0.32,
        rating: 4.0,
        isActive: true,
        images: ['https://images.unsplash.com/photo-1647416398335-b2fb36d01cc0?auto=format&fit=crop&q=80&w=800'],
        ownerId: adminId
      },
      {
        name: 'Airport EV Lounge',
        address: 'Terminal B Parking Lot',
        city: 'Dallas',
        coordinates: { lat: 32.7767, lng: -96.7970 },
        chargerTypes: ['DC', 'Fast'],
        totalSlots: 16,
        pricePerKwh: 0.50,
        rating: 4.7,
        isActive: false,
        images: ['https://images.unsplash.com/photo-1584988358451-b844ca76f44d?auto=format&fit=crop&q=80&w=800'],
        ownerId: adminId
      }
    ]);

    console.log('✅ Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error with Data Import: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  // Destroy script not fully implemented for brevity, just seeds
} else {
  seedData();
}
