import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

const UseMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<naver.maps.Marker | null>(null);

  useEffect(() => {
    const initMap = () => {
      if (mapRef.current) {
        const mapOptions: naver.maps.MapOptions = {
          center: new naver.maps.LatLng(37.5665, 126.9780),
          zoom: 10,
        };
        const map = new naver.maps.Map(mapRef.current, mapOptions);

        const handleCurrentLocation = () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const currentLocation = new naver.maps.LatLng(
                  position.coords.latitude,
                  position.coords.longitude
                );
                map.setCenter(currentLocation);
                map.setZoom(14);

                if (markerRef.current) {
                  markerRef.current.setPosition(currentLocation);
                } else {
                  markerRef.current = new naver.maps.Marker({
                    position: currentLocation,
                    map: map,
                  });
                }
              },
              (error) => {
                console.error('Error getting current location:', error);
              }
            );
          } else {
            alert('Geolocation is not supported by this browser.');
          }
        };

        const button = document.getElementById('current-location-button');
        if (button) {
          button.addEventListener('click', handleCurrentLocation);
        }
      }
    };

    if (typeof window !== 'undefined' && window.naver) {
      initMap();
    } else {
      window.addEventListener('load', initMap);
      return () => window.removeEventListener('load', initMap);
    }
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />
      <button
        id="current-location-button"
        className="absolute bottom-4 left-4 text-white p-2 flex items-center justify-center"
      >
        <Image src="/MapLocation.png" alt="Current Location" width={24} height={24} />
      </button>
    </div>
  );
};

export default UseMap;
