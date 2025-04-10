const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="py-2 fixed w-full bottom-0 bg-white z-[200] border-t flex justify-center items-center">
      <p className="text-xs md:text-sm lg:text-sm 2xl:text-lg font-semibold text-center">
        © {currentYear} Blue Sparing. All rights reserved. |&nbsp;
        <span className="text-gray-500">
          Designed with ❤️ by BLUE SPARING
        </span>
      </p>
    </div>
  );
};

export default Footer;