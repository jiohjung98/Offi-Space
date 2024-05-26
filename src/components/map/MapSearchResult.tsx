import React, { useState } from 'react';
import { Branch } from '@/api/types/branch';
import Image from 'next/image';

interface MapSearchResultProps {
  onClose: () => void;
  results: Branch[];
  onMarkerClick: (branch: Branch) => void; 
}

const MapSearchResult: React.FC<MapSearchResultProps> = ({ onClose, results, onMarkerClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredResults = results.filter(branch => branch.branchName.includes(searchTerm));

  const handleItemClick = (branch: Branch) => {
    onMarkerClick(branch);
    onClose(); 
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white" style={{ zIndex: '101' }}>
      <div className="relative p-4">
        <input
          type="text"
          placeholder="지점을 검색해보세요."
          className="w-full p-3 shadow-lg pl-10 rounded-lg"
          style={{ backgroundColor: '#F0F0F0' }}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
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
                  <span className="ml-4">{branch.branchName}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default MapSearchResult;
