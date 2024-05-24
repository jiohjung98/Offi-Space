import React from 'react';
import { ModalProps } from '@/api/types/branch';

const OfficeModal: React.FC<ModalProps> = ({ isOpen, onClose, branchName, branchAddress }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full p-4 rounded-t-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{branchName}</h2>
          <button onClick={onClose} className="text-xl">&times;</button>
        </div>
        <p className="mt-2">{branchAddress}</p>
      </div>
    </div>
  );
};

export default OfficeModal;
