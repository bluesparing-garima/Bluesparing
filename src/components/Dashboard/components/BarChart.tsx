import React from 'react';
interface BarChartProps {
  isDashboard?: boolean;
}
const BarChart: React.FC<BarChartProps> = ({ isDashboard = false }) => {
  return (
    <div className="h-full w-full">
    </div>
  );
};
export default BarChart;
