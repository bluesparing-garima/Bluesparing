import React from 'react';
import { ArrowUpward as ArrowUpwardIcon, ArrowDownward as ArrowDownwardIcon } from '@mui/icons-material';
interface StatBoxProps {
  title: string;
  value: string;
  change: string;
  isIncrease: boolean;
}
const StatBox: React.FC<StatBoxProps> = ({ title, value, change, isIncrease }) => {
  return (
    <div className="w-full p-1 rounded-2xl">
      <div className="flex items-center">
        {isIncrease ? (
          <ArrowDownwardIcon className="text-green-500 mr-2" />
        ) : (
          <ArrowUpwardIcon className="text-red-500 mr-2" />
        )}
        <h4 className="text-grey-100 ">{title}</h4>
      </div>
      <div className="flex items-baseline justify-between mt-1">
        <h5 className="text-3xl font-semibold">₹{value}</h5>
        <div
          className={`px-2 py-1 text-sm font-semibold rounded mr-5  ${
            isIncrease ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'
          }`}
        >
          {change}
        </div>
      </div>
    </div>
  );
};
export default StatBox;
