import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const center = [ -21.7059239, -47.4796947 ]; // Coordenadas de Santa Rita do Passa Quatro

const LeafletMap = () => (
  <MapContainer center={center} zoom={12} style={{ height: '100%', width: '100%' }}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
    <Marker position={center}>
      <Popup>
        Santa Rita do Passa Quatro
      </Popup>
    </Marker>
  </MapContainer>
);

export default LeafletMap;
