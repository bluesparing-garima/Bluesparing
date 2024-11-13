import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get current year dynamically

  return (
    <div className=' text-center py-6'>
      <p className="text-lg font-semibold mb-2">© {currentYear} Blue Sparing. All rights reserved.</p>
     
      <p className="text-xs text-gray-500 mt-4">Designed with ❤️ by BLUE SPARING</p>
    </div>
  );
};

export default Footer;
