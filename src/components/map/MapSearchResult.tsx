import React, { useState } from 'react';
import { Branch } from '@/api/types/branch';

interface MapSearchResultProps {
  onClose: () => void;
  results: Branch[];
}

const MapSearchResult: React.FC<MapSearchResultProps> = ({ onClose, results }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredResults = results.filter(branch => branch.branchName.includes(searchTerm));

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
          src="/Search.png"
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
                <li key={branch.branchName}>{branch.branchName}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default MapSearchResult;
