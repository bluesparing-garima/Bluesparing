import React from 'react';
import { useTheme } from '@mui/material';
import { tokens } from '../../../theme';

interface ProgressCircleProps {
  progress?: string;
  size?: string;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress = '0.75', size = '120' }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = parseFloat(progress) * 360;

  return (
    <div className="relative flex items-center justify-center">
      <div
        className="rounded-full"
        style={{
          background: `radial-gradient(${colors.primary[400]} 60%, transparent 62%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.greenAccent[500]} ${angle}deg 360deg),
            ${colors.blueAccent[500]}`,
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
      <div className="absolute flex flex-col items-center">
        <span className="text-lg font-semibold text-blue-500">{Math.round(parseFloat(progress) * 100)}%</span>
        <span className="text-sm">average payment</span>
      </div>
    </div>
  );
};

export default ProgressCircle;
