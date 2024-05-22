import React from 'react';

interface MapSearchBarProps {
  onFocus: () => void;
}

const MapSearchBar: React.FC<MapSearchBarProps> = ({ onFocus }) => {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-lg">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="지점을 검색해보세요."
          className="w-full p-3 shadow-lg rounded-lg pl-10"
          onFocus={onFocus}
        />
        <img
          src="/Search.png" 
          alt="Search Icon"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
        />
      </div>
    </div>
  );
};

export default MapSearchBar;
