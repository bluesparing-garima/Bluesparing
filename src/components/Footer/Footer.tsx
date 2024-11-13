import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className=" text-center py-6 fixed bottom-0 w-4/5">
      <p className="text-lg font-semibold mb-2">
        © {currentYear} Blue Sparing. All rights reserved.
      </p>

      <p className="text-xs text-gray-500 mt-4">
        Designed with ❤️ by BLUE SPARING
      </p>
    </div>
  );
};

export default Footer;
