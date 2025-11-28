import React from 'react';
import { Construction } from 'lucide-react';

const ComingSoon = ({ title }) => {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
          <Construction className="w-12 h-12 text-purple-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">Bu sayfa yakında hazır olacak...</p>
      </div>
    </div>
  );
};

export default ComingSoon;
