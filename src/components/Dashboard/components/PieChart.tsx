import React from 'react';
//import { ResponsivePie } from '@nivo/pie';
import { tokens } from '../../../theme';
import { useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';

interface PieChartProps {
  isDashboard?: boolean;
}
const mockPieData = [
  { id: "Successful", label: "Successful", value: 78, color: "#007BFF" },
  { id: "Pending", label: "Pending", value: 22, color: "#FFA500" }
];

const PieChart: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div className="flex flex-col items-center">
      <Typography variant="h5" fontWeight="600" className="mb-4">
        Payment
      </Typography>
      {/* <div className="w-full h-64">
        <ResponsivePie
          data={mockPieData}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: colors.blueAccent[300],
                },
              },
              legend: {
                text: {
                  fill: colors.redAccent[300],
                },
              },
              ticks: {
                line: {
                  stroke: colors.grey[100],
                  strokeWidth: 1,
                },
                text: {
                  fill: colors.grey[100],
                },
              },
            },
            legends: {
              text: {
                fill: colors.grey[100],
              },
            },
          }}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 0.2]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor={colors.blueAccent[100]}
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          enableArcLabels={false}
          arcLabelsRadiusOffset={0.4}
          arcLabelsSkipAngle={7}
          arcLabelsTextColor={{
            from: 'color',
            modifiers: [['darker', 2]],
          }}
          defs={[
            {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: 'rgba(255, 255, 255, 0.3)',
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: 'rgba(255, 255, 255, 0.3)',
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          legends={[]}
          colors={{ datum: 'data.color' }}
        />
        <div className="absolute inset-0 flex justify-center items-center">
          <Typography variant="h5" color={colors.blueAccent[500]}>
            78% average payment
          </Typography>
        </div>
      </div> */}
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
