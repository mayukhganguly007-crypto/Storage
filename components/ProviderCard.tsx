
import React from 'react';
import { StorageProvider } from '../types';

interface ProviderCardProps {
  provider: StorageProvider;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-blue-100 text-blue-700 uppercase tracking-wider mb-2 inline-block">
            {provider.category}
          </span>
          <h3 className="text-xl font-bold text-gray-800">{provider.name}</h3>
        </div>
        <div className="flex items-center text-yellow-500">
          <i className="fas fa-shield-alt mr-1"></i>
          <span className="font-semibold text-sm">{provider.securityRating}/10</span>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {provider.description}
      </p>
      
      <div className="mb-4">
        <p className="text-sm font-semibold text-green-600 flex items-center mb-1">
          <i className="fas fa-gift mr-2"></i> Free Tier:
        </p>
        <p className="text-sm text-gray-700">{provider.freeTier}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Pros</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            {provider.pros?.slice(0, 3).map((pro, i) => (
              <li key={i} className="flex items-start">
                <i className="fas fa-check text-green-500 mr-1 mt-0.5"></i>
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Cons</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            {provider.cons?.slice(0, 3).map((con, i) => (
              <li key={i} className="flex items-start">
                <i className="fas fa-times text-red-400 mr-1 mt-0.5"></i>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;
