import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[99999]">
      <div className="h-20 w-20 animate-spin rounded-full border-8 border-t-space-purple border-gray-300" />
    </div>
  );
};

export default LoadingSpinner;
