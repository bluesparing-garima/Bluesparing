const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="py-2 fixed w-[100%]  bottom-0 bg-white z-[200]">
      <p className="text-sm font-semibold text-center">
        © {currentYear} Blue Sparing. All rights reserved. |
        <span className="text-xs text-gray-500 mt-0">
          Designed with ❤️ by BLUE SPARING
        </span>
      </p>
    </div>
  );
};

export default Footer;
