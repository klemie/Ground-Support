import React from 'react';
import GoogleMapReact from 'google-map-react';

interface PinProps {
  lat: number;
  lng: number;
  text: string;
}

const Pin: React.FC<PinProps> = ({ text }) => (
  <div style={{ color: 'white', background: 'red', padding: '5px 10px', borderRadius: '50%' }}>
    {text}
  </div>
);

const MapWithPins: React.FC = () => {
  const mapCenter = { lat: 40.7128, lng: -74.0060 }; // Example center coordinates
  const pins: PinProps[] = [
    { lat: 40.7128, lng: -74.0060, text: 'Pin 1' },
    { lat: 37.7749, lng: -122.4194, text: 'Pin 2' },
  ]; // Example pin coordinates and text

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact
        defaultCenter={mapCenter}
        defaultZoom={10}
      >
        {pins.map((pin, index) => (
          <Pin
            key={index}
            lat={pin.lat}
            lng={pin.lng}
            text={pin.text}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default MapWithPins;