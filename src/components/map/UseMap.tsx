import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import MapSearchBar from './MapSearchBar'; 
import MapSearchResult from './MapSearchResult'; 

const UseMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<naver.maps.Marker | null>(null);
  const [imageSrc, setImageSrc] = useState('/MapLocation.png');
  const [showMessage, setShowMessage] = useState(true);
  const [showSearchResults, setShowSearchResults] = useState(false);

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
              map.setZoom(16);
            } else {
              markerRef.current = new naver.maps.Marker({
                position: currentLocation,
                map: map,
                icon: {
                  url: '/MyLocation.png',
                  size: new naver.maps.Size(48, 48),
                  origin: new naver.maps.Point(0, 0),
                  anchor: new naver.maps.Point(24, 24),
                },
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

  const handleDismissMessage = () => {
    setShowMessage(false);
  };

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />
      {showMessage && (
        <><div className="absolute bottom-[90px] left-4 bg-white px-3 py-3.5 shadow-lg flex items-center">
          <span>더 정확한 접속위치를 확인해보세요!</span>
          <button onClick={handleDismissMessage} className="ml-4">X</button>
        </div><Image src='/triangle1.svg' alt="Current Location" className='absolute bottom-[80px] left-[40px]' width={18} height={10} /></>
      )}
      <MapSearchBar onFocus={() => setShowSearchResults(true)} />
      {showSearchResults && <MapSearchResult onClose={() => setShowSearchResults(false)} />}
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
