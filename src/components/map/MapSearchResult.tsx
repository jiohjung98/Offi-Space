import React, { useState, useEffect, useRef } from 'react';
import { Branch } from '@/api/types/branch';
import Image from 'next/image';
import { calculateDistance, formatDistance } from '@/utils/calculateDistance';
import { MapSearchResultProps } from '@/api/types/branch';

const MapSearchResult: React.FC<MapSearchResultProps> = ({ onClose, results, onMarkerClick, currentLatitude, currentLongitude }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const filteredResults = results
    .filter(branch => branch.branchName.includes(searchTerm))
    .sort((a, b) => {
      const distanceA = calculateDistance(currentLatitude, currentLongitude, a.branchLatitude, a.branchLongitude);
      const distanceB = calculateDistance(currentLatitude, currentLongitude, b.branchLatitude, b.branchLongitude);
      return distanceA - distanceB;
    });

  const handleItemClick = (branch: Branch) => {
    onMarkerClick(branch);
    onClose(); 
  };

  return (
    <section className="absolute top-0 left-0 w-full h-full bg-white" style={{ zIndex: '101' }}>
      <div className="relative p-4">
        <input
          type="text"
          placeholder="지점을 검색해보세요."
          className="w-full p-3 shadow-lg pl-10 rounded-lg"
          style={{ backgroundColor: '#F0F0F0' }}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          ref={inputRef}
        />
        <img
          src="/map/Search.png"
          alt="Search Icon"
          className="absolute left-7 top-1/2 transform -translate-y-1/2 w-5 h-5"
        />
        <button onClick={onClose} className="absolute top-7 right-8">
          X
        </button>
      </div>
      {searchTerm && (
        <div className="p-4">
          {filteredResults.length === 0 ? (
            <p className="text-gray-500">검색 결과가 없습니다.</p>
          ) : (
            <ul>
              {filteredResults.map(branch => (
                <li key={branch.branchName} className="flex items-center p-4" onClick={() => handleItemClick(branch)}>
                  <Image src="/map/OfficeLocationSmall1.svg" alt="Location" width={12} height={16} />
                  <span className="ml-4 cursor-pointer">{branch.branchName}</span>
                  <span className="ml-auto">{formatDistance(calculateDistance(currentLatitude, currentLongitude, branch.branchLatitude, branch.branchLongitude))}</span> 
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
};

export default MapSearchResult;
