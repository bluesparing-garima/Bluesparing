// src/pages/ComingSoon.tsx
import React from 'react';

const ComingSoonHealth: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full text-center p-4">
      <div className='shadow-[0_0_5px_1px_#F2DDD4] flex flex-col justify-center items-center p-3 h-1/3 w-1/3'>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">🚧 Coming Soon</h1>
        <p className="text-lg text-gray-600">
          This section is under development. Please check back later!
        </p>
      </div>
    </div>
  );
};

export default ComingSoonHealth;
