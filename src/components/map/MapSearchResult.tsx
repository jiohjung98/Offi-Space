import React from 'react';

interface MapSearchResultProps {
  onClose: () => void;
}

const MapSearchResult: React.FC<MapSearchResultProps> = ({ onClose }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white" style={{zIndex: '101'}}>
      <div className="relative p-4">
        <input
          type="text"
          placeholder="지점을 검색해보세요."
          className="w-full p-3 shadow-lg pl-10 rounded-lg" style={{ backgroundColor: '#F0F0F0' }}
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
      <div className="p-4">
        
      </div>
    </div>
  );
};

export default MapSearchResult;
