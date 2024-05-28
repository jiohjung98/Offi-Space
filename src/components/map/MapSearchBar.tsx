import React from 'react';
import { MapSearchBarProps } from '@/api/types/branch';

const MapSearchBar: React.FC<MapSearchBarProps> = ({ onFocus, onChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <section className="absolute top-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-lg">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="지점을 검색해보세요."
          className="w-full p-3 shadow-lg rounded-lg pl-10"
          onFocus={onFocus}
          onChange={handleInputChange}
          readOnly
        />
        <img
          src="/map/Search.png"
          alt="Search Icon"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
        />
      </div>
    </section>
  );
};

export default MapSearchBar;
