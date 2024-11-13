import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className=" text-center py-2 sticky bottom-0">
      <p className="text-lg font-semibold">
        © {currentYear} Blue Sparing. All rights reserved. 
        |
      <span className="text-xs text-gray-500 mt-0">
        Designed with ❤️ by BLUE SPARING
      </span>
      </p>
    </div>
  );
};

export default Footer;
