import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import MapSearchBar from './MapSearchBar'; 
import MapSearchResult from './MapSearchResult'; 
import { getBranchInfo } from '@/api/map/getOffice';
import { Branch } from '@/api/types/branch';

const UseMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<naver.maps.Marker | null>(null);
  const markerRefs = useRef<naver.maps.Marker[]>([]);
  const [imageSrc, setImageSrc] = useState('/MapLocation.png');
  const [showMessage, setShowMessage] = useState(true);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    const initMap = () => {
      if (mapRef.current) {
        const initialCenter = new naver.maps.LatLng(37.4979, 127.0276);
        const mapOptions: naver.maps.MapOptions = {
          center: initialCenter,
          zoom: 16,
        };
        new naver.maps.Map(mapRef.current, mapOptions);
      }
    };

    if (typeof window !== 'undefined' && window.naver) {
      initMap();
    } else {
      window.addEventListener('load', initMap);
      return () => window.removeEventListener('load', initMap);
    }
  }, []);

  useEffect(() => {
    getBranchInfo()
      .then((response) => {
        console.log('Branch Info:', response);
        setBranches(response.data);
      })
      .catch((error) => {
        console.error('Error fetching branch info:', error);
      });
  }, []);

  useEffect(() => {
    if (mapRef.current && branches.length > 0) {
      const map = new naver.maps.Map(mapRef.current, {
        center: new naver.maps.LatLng(37.4979, 127.0276),
        zoom: 16,
      });
      setMarkers(map);
    }
  }, [branches]);

  const setMarkers = (map: naver.maps.Map) => {
    markerRefs.current.forEach(marker => marker.setMap(null));
    markerRefs.current = [];

    branches.forEach((branch) => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(branch.branchLatitude, branch.branchLongitude),
        map: map,
        icon: {
          url: '/OFficeActive.svg',
          size: new naver.maps.Size(48, 48),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(24, 24),
        },
      });
      markerRefs.current.push(marker);
    });
  };

  useEffect(() => {
    const handleCurrentLocation = () => {
      setLoading(true);
      if (navigator.geolocation && mapRef.current) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (mapRef.current) {
              const map = new naver.maps.Map(mapRef.current, {
                center: new naver.maps.LatLng(position.coords.latitude, position.coords.longitude),
                zoom: 16,
              });
              if (markerRef.current) {
                markerRef.current.setPosition(new naver.maps.LatLng(position.coords.latitude, position.coords.longitude));
                map.setZoom(16);
              } else {
                markerRef.current = new naver.maps.Marker({
                  position: new naver.maps.LatLng(position.coords.latitude, position.coords.longitude),
                  map: map,
                  icon: {
                    url: '/MyLocation.png',
                    size: new naver.maps.Size(48, 48),
                    origin: new naver.maps.Point(0, 0),
                    anchor: new naver.maps.Point(24, 24),
                  },
                });
              }
            }
            setLoading(false);
          },
          (error) => {
            console.error('Error getting current location:', error);
            setLoading(false);
          }
        );
      } else {
        alert('Geolocation is not supported by this browser.');
        setLoading(false);
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
        <>
          <div className="absolute bottom-[90px] left-4 bg-white px-3 py-3.5 shadow-lg flex items-center">
            <span>더 정확한 접속위치를 확인해보세요!</span>
            <button onClick={handleDismissMessage} className="ml-4">X</button>
          </div>
          <Image src='/triangle.svg' alt="Current Location" className='absolute bottom-[80px] left-[40px]' width={18} height={10} />
        </>
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
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default UseMap;
