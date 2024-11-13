import React from 'react';
import mastercard from '../../assets/mastercard.svg'
const Card: React.FC = () => {
  return (
    <div
      className="w-full h-40 rounded-lg shadow-lg p-4 flex flex-col justify-between bg-gradient-to-b from-violet-600 via-violet-600 to-indigo-600">
      <div className='flex justify-between'>
        <div>
        <span className="text-white text-sm">Current Balance</span>
        <div className="text-white text-2xl font-bold">₹ 50,000</div>
        </div>
        <div>
           <img src={mastercard} alt="mastercard" className='mt-2 mr-3'/>
        </div>
      </div>
      <div className="flex justify-between text-white ">
        <div>
          <div className="text-sm font-normal">5282 3456 7890 1289</div>
        </div>
        <div>
          <div className="text-sm font-normal">09/25</div>
        </div>
      </div>
    </div>
  );
};
export default Card;
