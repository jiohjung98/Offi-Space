import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const UseMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<naver.maps.Marker | null>(null);
  const [imageSrc, setImageSrc] = useState('/MapLocation.png');

  useEffect(() => {
    let map: naver.maps.Map;

    const initMap = () => {
      if (mapRef.current) {
        const initialCenter = new naver.maps.LatLng(37.4979, 127.0276);
        const mapOptions: naver.maps.MapOptions = {
          center: initialCenter,
          zoom: 16,
        };
        map = new naver.maps.Map(mapRef.current, mapOptions);
      }
    };

    if (typeof window !== 'undefined' && window.naver) {
      initMap();
    } else {
      window.addEventListener('load', initMap);
      return () => window.removeEventListener('load', initMap);
    }

    const handleCurrentLocation = () => {
      if (navigator.geolocation && map) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const currentLocation = new naver.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            );

            map.panTo(currentLocation, { duration: 500 });

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

    return () => {
      if (button) {
        button.removeEventListener('click', handleCurrentLocation);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />
      <button
        id="current-location-button"
        className="absolute bottom-4 left-4 p-2 flex items-center justify-center"
        onMouseEnter={() => setImageSrc('/MapLocationActive.png')}
        onMouseLeave={() => setImageSrc('/MapLocation.png')}
        onClick={() => setImageSrc('/MapLocationActive.png')}
      >
        <Image src={imageSrc} alt="Current Location" width={48} height={48} />
      </button>
    </div>
  );
};

export default UseMap;
