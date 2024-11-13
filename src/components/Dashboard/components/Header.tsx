import React from 'react';
interface HeaderProps {
  title: string;
  subtitle: string;
}
const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-blue-500 mb-1">{title}</h2>
      <h5 className="text-xl text-yellow-600">{subtitle}</h5>
    </div>
  );
};
export default Header;
