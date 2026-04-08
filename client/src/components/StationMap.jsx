import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';

// Fix leaflet default icon issue in React
delete L.Icon.Default.prototype._getIconUrl;

const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const StationMap = ({ stations }) => {
  const navigate = useNavigate();
  
  // Default center (first station or a default location, e.g., Los Angeles)
  const defaultCenter = stations.length > 0 && stations[0].lat && stations[0].lng 
    ? [stations[0].lat, stations[0].lng] 
    : [34.0522, -118.2437]; 
  
  return (
    <div className="h-full w-full rounded-2xl overflow-hidden border border-slate-700 shadow-2xl z-10 sticky top-24 shadow-ev-green/5">
      <MapContainer 
        center={defaultCenter} 
        zoom={11} 
        scrollWheelZoom={true} 
        style={{ height: '600px', width: '100%', zIndex: 10 }}
        className="w-full h-[400px] lg:h-full"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {stations.map(station => {
          if (!station.lat || !station.lng) return null;
          return (
            <Marker 
              key={station.id} 
              position={[station.lat, station.lng]} 
              icon={customIcon}
            >
              <Popup className="custom-popup border-none p-0 rounded-2xl overflow-hidden">
                <div className="bg-dark-tech-light p-4 rounded-xl shadow-lg border border-slate-700 font-body min-w-[220px]">
                  <h3 className="font-bold text-lg mb-1 text-white truncate">{station.name}</h3>
                  <p className="text-sm text-slate-400 mb-3 truncate">{station.address}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-ev-cyan animate-pulse"></span>
                      <span className="text-xs text-slate-300 font-bold">{station.chargerCount} Slots</span>
                    </div>
                    <span className="font-bold text-ev-green text-lg">${station.price}<span className="text-xs text-slate-500 font-normal">/kWh</span></span>
                  </div>

                  <button 
                    onClick={() => navigate(`/stations/${station.id}`)}
                    className="w-full bg-ev-green text-dark-tech px-4 py-2 rounded-xl font-bold text-sm hover:brightness-110 transition-all font-display"
                  >
                    View & Book
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default StationMap;
