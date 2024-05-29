/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import MapSearchBar from './MapSearchBar';
import MapSearchResult from './MapSearchResult';
import { getBranchInfo } from '@/api/map/getOffice';
import { Branch } from '@/api/types/branch';
import OfficeModal from './OfficeModal';

const UseMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<naver.maps.Marker | null>(null);
  const markerRefs = useRef<{ [key: string]: naver.maps.Marker }>({});
  const [imageSrc, setImageSrc] = useState('/map/MapLocation.png');
  const [showMessage, setShowMessage] = useState(true);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBranches, setFilteredBranches] = useState<Branch[]>([]);
  const [currentLatitude, setCurrentLatitude] = useState<number>(37.4979);
  const [currentLongitude, setCurrentLongitude] = useState<number>(127.0276);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  useEffect(() => {
    const initMap = () => {
      if (mapRef.current) {
        const initialCenter = new naver.maps.LatLng(37.4979, 127.0276);
        const mapOptions: naver.maps.MapOptions = {
          center: initialCenter,
          zoom: 16,
        };
        const mapInstance = new naver.maps.Map(mapRef.current, mapOptions);
        setMap(mapInstance);
    
        naver.maps.Event.addListener(mapInstance, 'click', () => {
          setSelectedMarker(null);
          setIsModalOpen(false);
        });
        setMarkers(mapInstance);
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
    if (map && branches.length > 0) {
      setMarkers(map);
    }
  }, [branches, map]);

  useEffect(() => {
    if (map) {
      setMarkers(map);
    }
  }, [selectedMarker]);

  useEffect(() => {
    const filtered = branches.filter(branch => branch.branchName.includes(searchQuery));
    setFilteredBranches(filtered);
  }, [searchQuery, branches]);

  const setMarkers = (map: naver.maps.Map) => {
    Object.values(markerRefs.current).forEach(marker => marker.setMap(null));
    markerRefs.current = {};

    branches.forEach((branch) => {
      const isSelected = selectedMarker === branch.branchName;
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(branch.branchLatitude, branch.branchLongitude),
        map: map,
        icon: {
          url: isSelected || selectedMarker === null ? '/map/OfficeActive.svg' : '/map/OfficeInActive.svg',
          size: new naver.maps.Size(48, 48),
          scaledSize: new naver.maps.Size(isSelected ? 60 : 48, isSelected ? 60 : 48),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(24, 24),
        },
      });
      naver.maps.Event.addListener(marker, 'click', () => {
        handleMarkerClick(branch);
      });
      markerRefs.current[branch.branchName] = marker;
    });
  };

  useEffect(() => {
    const handleCurrentLocation = () => {
      setLoading(true);
      if (navigator.geolocation && map) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLatitude(latitude);
            setCurrentLongitude(longitude);

            const currentLocation = new naver.maps.LatLng(latitude, longitude);
            map.panTo(currentLocation);
            if (markerRef.current) {
              markerRef.current.setPosition(currentLocation);
            } else {
              markerRef.current = new naver.maps.Marker({
                position: currentLocation,
                map: map,
                icon: {
                  url: '/map/MyLocation.png',
                  size: new naver.maps.Size(48, 48),
                  scaledSize: new naver.maps.Size(48, 48),
                  origin: new naver.maps.Point(0, 0),
                  anchor: new naver.maps.Point(24, 24),
                },
              });
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
  }, [map]);

  const handleMarkerClick = (branch: Branch) => {
    const position = new naver.maps.LatLng(branch.branchLatitude, branch.branchLongitude);
    map?.panTo(position);

    setSelectedBranch(branch);
    setIsModalOpen(true);
    setSelectedMarker(branch.branchName);
  };

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleCurrentLocationClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsModalOpen(false);
    const button = document.getElementById('current-location-button');
    if (button) {
      button.click();
    }
  };

  const handleCurrentLocationTextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowMessage(false);
    const button = document.getElementById('current-location-text');
    if (button) {
      button.click();
    }
  };

  return (
    <section className="relative w-full h-screen">
      <div ref={mapRef} className="w-full h-full" />
      {showMessage && (
        <>
          <div className={`absolute ${isModalOpen ? 'bottom-[355px]' : 'bottom-[180px]'} left-4 bg-white px-3 py-3.5 shadow-lg flex items-center`}>
            <span>더 정확한 접속위치를 확인해보세요!</span>
            <button id="current-location-text" onClick={handleCurrentLocationTextClick} className="ml-4">X</button>
          </div>
          <Image src='/map/triangle.svg' alt="Current Location" className={`absolute ${isModalOpen ? 'bottom-[345px]' : 'bottom-[170px]'} left-[40px]`} width={18} height={10} />
        </>
      )}
      <MapSearchBar onFocus={() => setShowSearchResults(true)} onChange={handleSearchQueryChange} />
      {showSearchResults && (
        <MapSearchResult
          onClose={() => setShowSearchResults(false)}
          results={filteredBranches}
          onMarkerClick={handleMarkerClick}
          currentLatitude={currentLatitude}
          currentLongitude={currentLongitude}
        />
      )}
      <OfficeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        branchName={selectedBranch?.branchName || ''}
        branchAddress={selectedBranch?.branchAddress || ''}
      />
      <button
        id="current-location-button"
        className={`absolute ${isModalOpen ? 'bottom-[280px]' : 'bottom-[105px]'} left-4 p-2 flex items-center justify-center`}
        onMouseEnter={() => setImageSrc('/map/MapLocationActive.png')}
        onMouseLeave={() => setImageSrc('/map/MapLocation.png')}
        onClick={handleCurrentLocationClick}
      >
        <Image src={imageSrc} alt="Current Location" width={48} height={48} />
      </button>

      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="loader"></div>
        </div>
      )}
    </section>
  );
};

export default UseMap;
