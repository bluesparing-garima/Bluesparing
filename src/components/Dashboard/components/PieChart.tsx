import React from 'react';
import Typography from '@mui/material/Typography';
const PieChart: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <Typography variant="h5" fontWeight="600" className="mb-4">
        Payment
      </Typography>

      <div className="flex justify-around w-full mt-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 mr-2"></div>
          <Typography>Successful</Typography>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-orange-500 mr-2"></div>
          <Typography>Pending</Typography>
        </div>
      </div>
      <Typography className="mt-4">Average has been counted successfully.</Typography>
    </div>
  );
};

export default PieChart;
