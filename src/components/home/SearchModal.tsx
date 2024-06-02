import React, { useState, useEffect, useRef } from 'react';
import { Branch } from '@/api/types/branch';
import Image from 'next/image';
import { getBranchInfo } from '@/api/map/getOffice';
import SelectOfficeMap from './SelectOfficeMap';

interface SearchModalProps {
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onBranchSelect: (branch: Branch) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ onClose, onBranchSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allBranches, setAllBranches] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBranchInfo();
        const branchInfo = data.data;
        const branchesArray = Array.isArray(branchInfo) ? branchInfo : [];
        setAllBranches(branchesArray);
      } catch (error) {
        console.error('Error fetching branch info:', error);
      }
    };

    fetchData();
  }, []);

  const filteredResults = allBranches.filter(branch => branch.branchName.includes(searchTerm));

  const handleItemClick = (branch: Branch) => {
    setSelectedBranch(branch);
    onBranchSelect(branch);
  };

  return (
    <div className='fixed inset-0 flex justify-center items-center z-[9999]'>
      <section className="w-[393px] mx-auto h-full bg-white" style={{ zIndex: '101' }}>
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
              <ul className="divide-y divide-gray-200">
                {filteredResults.map(branch => (
                  <li key={branch.branchName} className="flex items-center py-4 cursor-pointer hover:bg-gray-100" onClick={() => handleItemClick(branch)}>
                    <Image src="/map/OfficeLocationSmall1.svg" alt="Location" width={12} height={16} className="mr-4" />
                    <span>{branch.branchName}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </section>
      {selectedBranch && <SelectOfficeMap branch={selectedBranch} onClose={onClose} />}
    </div>
  );
};

export default SearchModal;
