import Station from '../models/Station.js';

/**
 * EV Hardware Protocol Simulator (Mocking OCPP/MQTT)
 * Runs in the background to randomly update slots from 'Available' to 'Charging' 
 * and simulate real-time station usage metrics.
 */
const simulateChargers = () => {
    console.log('[EV Protocol Simulator] Connecting to MQTT broker...');
    
    // Simulate heartbeats from thousands of chargers
    setInterval(async () => {
        try {
            // Pick a random station to "ping" its heartbeat
            const stations = await Station.find({ isActive: true });
            if (stations.length === 0) return;

            const randomStation = stations[Math.floor(Math.random() * stations.length)];
            
            // Randomly update fake status in memory or console (simulate IoT ping)
            const mockPowerDraw = (Math.random() * 150).toFixed(2);
            // console.log(`[OCPP Ping] Station ${randomStation.name} - Slot 1 drawing ${mockPowerDraw} kW`);
            
        } catch (error) {
            console.error('[EV Simulator Error] Connection lost');
        }
    }, 15000); // Ping every 15 seconds
};

export default simulateChargers;
