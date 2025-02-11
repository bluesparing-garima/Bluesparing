const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="py-2 fixed w-full bottom-0 bg-white z-[200]">
      <p className="text-[8px] text-center xl:text-[14px] xl:pl-[13%] lg:text-[14px] md:text-[12px] md:pr-[30%] 2xl:text-[16px] sm:text-[12px] font-semibold">
        © {currentYear} Blue Sparing. All rights reserved. |&nbsp;
        <span className="text-[8px] xl:text-[14px] lg:text-[14px] sm:text-[12px] md:text-[12px] 2xl:text-[16px] text-gray-500 my-1">
          Designed with ❤️ by BLUE SPARING
        </span>
      </p>
    </div>
  );
};

export default Footer;
