/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import MapSearchBar from './MapSearchBar';
import MapSearchResult from './MapSearchResult';
import { getBranchInfo } from '@/api/map/getOffice';
import { Branch } from '@/api/types/branch';
import BranchModal from './BranchModal';
import { getOfficeAvailable } from '@/api/map/getOfficeAvailable';

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
  const [branchCount, SetBranchCount] = useState(0);
  const [canBranchCount, SetCanBranchCount] = useState(0);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream);
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
  }, []);

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
          resetMarkers();
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
    const filtered = branches.filter(branch => branch.branchName.includes(searchQuery));
    setFilteredBranches(filtered);
  }, [searchQuery, branches]);

  useEffect(() => {
    if (selectedMarker !== null) {
      updateMarkers();
    }
  }, [selectedMarker]);

  const setMarkers = (map: naver.maps.Map) => {
    Object.values(markerRefs.current).forEach(marker => marker.setMap(null));
    markerRefs.current = {};

    branches.forEach((branch) => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(branch.branchLatitude, branch.branchLongitude),
        map: map,
        icon: {
          url: '/map/OfficeInActive.svg',
          size: new naver.maps.Size(48, 48),
          scaledSize: new naver.maps.Size(48, 48),
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

  const updateMarkers = () => {
    Object.values(markerRefs.current).forEach(marker => {
      marker.setIcon({
        url: '/map/OfficeInActive.svg',
        size: new naver.maps.Size(48, 48),
        scaledSize: new naver.maps.Size(48, 48),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(24, 24),
      });
    });

    if (selectedMarker) {
      const selectedMarkerRef = markerRefs.current[selectedMarker];
      if (selectedMarkerRef) {
        selectedMarkerRef.setIcon({
          url: '/map/OfficeActive.svg',
          size: new naver.maps.Size(60, 60),
          scaledSize: new naver.maps.Size(60, 60),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(30, 30),
        });
      }
    }
  };

  const resetMarkers = () => {
    Object.values(markerRefs.current).forEach(marker => {
      marker.setIcon({
        url: '/map/OfficeInActive.svg',
        size: new naver.maps.Size(48, 48),
        scaledSize: new naver.maps.Size(48, 48),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(24, 24),
      });
    });
  };

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

  useEffect(() => {
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

  const handleOfficeAvailable = async (branch: Branch) => {
    try {
      const data = await getOfficeAvailable(branch.branchName); 
      if (data.data) {
        SetBranchCount(data.data.branchTotalMeetingRoomCount);
        SetCanBranchCount(data.data.branchActiveMeetingRoomCount);
        console.log(data);
      }
    } catch (error) {
      console.error('Error updating selected branch:', error);
    }
  };

  const handleMarkerClick = (branch: Branch) => {
    const position = new naver.maps.LatLng(branch.branchLatitude, branch.branchLongitude);
    map?.panTo(position);
    setShowMessage(false);
    setSelectedBranch(branch);
    setIsModalOpen(true);
    setSelectedMarker(branch.branchName);
    handleOfficeAvailable(branch);
    
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

  const handleCurrentLocationTextClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowMessage(false);
  };
  

  return (
    <section className="relative w-full h-screen">
      <div ref={mapRef} className="w-full h-full" />
      {showMessage && (
        <>
          <div className={`absolute ${isModalOpen ? 'bottom-[355px]' : 'bottom-[180px]'} left-4 bg-white px-3 py-3.5 shadow-lg flex items-center ${isIOS && !isStandalone ? 'mb-[80px]' : ''}`}>
            <span>더 정확한 접속위치를 확인해보세요!</span>
            <div onClick={handleCurrentLocationTextClick} className="ml-4 inline-block cursor-pointer">
              <Image src='/CloseBtn.svg' alt='closeBtn' width={13} height={13} />
            </div>
          </div>
          <Image src='/map/triangle.svg' alt="Current Location" className={`absolute ${isModalOpen ? 'bottom-[345px]' : 'bottom-[170px]'} left-[40px]  ${isIOS && !isStandalone ? 'mb-[80px]' : ''}`} width={18} height={10} />
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
      <BranchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        branchName={selectedBranch?.branchName || ''}
        branchAddress={selectedBranch?.branchAddress || ''} 
        branchActiveMeetingRoomCount={canBranchCount} 
        branchTotalMeetingRoomCount={branchCount}        
      />
      <button
        id="current-location-button"
        className={`absolute ${isModalOpen ? 'bottom-[300px]' : 'bottom-[105px]'} left-4 p-2 flex items-center justify-center ${isIOS && !isStandalone ? 'mb-16' : ''}`}
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
