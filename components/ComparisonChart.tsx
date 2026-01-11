
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const dummyData = [
  { name: 'AWS S3', freeGB: 5, paidCost: 0.023 },
  { name: 'Google Drive', freeGB: 15, paidCost: 0.015 },
  { name: 'Dropbox', freeGB: 2, paidCost: 0.010 },
  { name: 'IPFS', freeGB: 100, paidCost: 0.000 },
  { name: 'OneDrive', freeGB: 5, paidCost: 0.012 },
];

const ComparisonChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold mb-6 text-gray-800">Storage Efficiency Comparison (Free vs Cost)</h3>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dummyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="top" height={36}/>
            <Bar dataKey="freeGB" name="Free Storage (GB)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="paidCost" name="Cost per GB ($)" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-gray-500 mt-4 italic text-center">
        *Data based on standard consumer tiers and open networking averages.
      </p>
    </div>
  );
};

export default ComparisonChart;
