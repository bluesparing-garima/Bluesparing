import React, { useState } from "react";
import logo from "../../assets/logo.svg";

const Sidebar = () => {
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const [isPolicyDropdownOpen, setIsPolicyDropdownOpen] = useState(false);

  const toggleAdminDropdown = () => {
    setIsAdminDropdownOpen((prevState) => !prevState);
  };
  const togglePolicyDropdown = () => {
    setIsPolicyDropdownOpen((prevState) => !prevState);
  };

  const handleDropdownItemClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Additional logic for dropdown item click if needed
  };

  return (
    <>
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white">
        <div className="flex items-center justify-center h-16 bg-white">
          <a href="/">
            <img src={logo} className="w-48 mx-auto" alt="Logo" />
          </a>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 py-7 bg-white">
            <a
              href="/dashboard"
              className="flex items-center px-4 py-2 ml-3 text-gray-500 hover:bg-safekaroDarkBlue hover:text-white hover:rounded-lg mr-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                viewBox="0 0 24 24"
                stroke="grey"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              Dashboard
            </a>

            <>
              <hr className="my-3" />
              <div className="flex flex-col mt-2 ml-3 mr-3">
                <div
                  className="flex items-center px-4 py-2 text-gray-500 hover:bg-safekaroDarkBlue hover:text-white hover:rounded-lg cursor-pointer"
                  onClick={toggleAdminDropdown}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m6-6H6"
                    />
                  </svg>
                  Admin
                  <i className="fas fa-chevron-down text-sm text-gray-400 ml-auto"></i>
                </div>
                {isAdminDropdownOpen && (
                  <div className="ml-6">
                    <a
                      href="/role"
                      className="flex items-center px-4 py-2 mt-2 text-gray-500 hover:bg-safekaroDarkBlue hover:text-white hover:rounded-lg"
                      onClick={handleDropdownItemClick}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                        />
                      </svg>
                      Role
                    </a>
                    <a
                      href="/brokers"
                      className="flex items-center px-4 py-2 mt-2 text-gray-500 hover:bg-safekaroDarkBlue hover:text-white hover:rounded-lg"
                      onClick={handleDropdownItemClick}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                        />
                      </svg>
                      Broker
                    </a>
                    <a
                      href="/branch"
                      className="flex items-center px-4 py-2 mt-2 text-gray-500 hover:bg-safekaroDarkBlue hover:text-white hover:rounded-lg"
                      onClick={handleDropdownItemClick}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                        />
                      </svg>
                      Branch
                    </a>
                    <a
                      href="/categories"
                      className="flex items-center px-4 py-2 mt-2 text-gray-500 hover:bg-safekaroDarkBlue hover:text-white hover:rounded-lg"
                      onClick={handleDropdownItemClick}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                        />
                      </svg>
                      Category
                    </a>
                    <a
                      href="/products"
                      className="flex items-center px-4 py-2 mt-2 text-gray-500 hover:bg-safekaroDarkBlue hover:text-white hover:rounded-lg"
                      onClick={handleDropdownItemClick}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                        />
                      </svg>
                      Product
                    </a>

                    <a
                      href="/subproducts"
                      className="flex items-center px-4 py-2 mt-2 text-gray-500 hover:bg-safekaroDarkBlue hover:text-white hover:rounded-lg"
                      onClick={handleDropdownItemClick}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25m-2.25 0h-2.25m0 0v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v4.964m12-4.006v4.006m0 0v3.75m-12-7.756v3.75m0 0h12m-12 0V14.25m12-4.5V9m0 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25m-2.25 0h-2.25m0 0v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v4.964m12-4.006v4.006m0 0v3.75m-12-7.756v3.75m0 0h12m-12 0V14.25m12-4.5V9"
                        />
                      </svg>
                      Sub Category
                    </a>
                    <a
                      href="/companies"
                      className="flex items-center px-4 py-2 mt-2 text-gray-500 hover:bg-safekaroDarkBlue hover:text-white hover:rounded-lg"
                      onClick={handleDropdownItemClick}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                        />
                      </svg>
                      Company
                    </a>

                    <a
                      href="/casetype"
                      className="flex items-center px-4 py-2 mt-2 text-gray-500 hover:bg-safekaroDarkBlue hover:text-white hover:rounded-lg"
                      onClick={handleDropdownItemClick}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0 3.375 3.375 0 0 1 6.75 0 3.375 3.375 0 0 1-6.75 0 3.375 3.375 0 0 1-6.75 0Z"
                        />
                      </svg>
                      Case Type
                    </a>

                    <a
                      href="/policyType"
                      className="flex items-center px-4 py-2 mt-2 text-gray-500 hover:bg-safekaroDarkBlue hover:text-white hover:rounded-lg"
                      onClick={handleDropdownItemClick}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                        />
                      </svg>
                      Policy Type
                    </a>
                    <a
                      href="/fueltype"
                      className="flex items-center px-4 py-2 mt-2 text-gray-500 hover:bg-safekaroDarkBlue hover:text-white hover:rounded-lg"
                      onClick={handleDropdownItemClick}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                        />
                      </svg>
                      Fuel Type
                    </a>
                    <a
                      href="/makes"
                      className="flex items-center px-4 py-2 mt-2 text-gray-500 hover:bg-safekaroDarkBlue hover:text-white hover:rounded-lg"
                      onClick={handleDropdownItemClick}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                        />
                      </svg>
                      Make
                    </a>
                    <a
                      href="/models"
                      className="flex items-center px-4 py-2 mt-2 text-gray-500 hover:bg-safekaroDarkBlue hover:text-white hover:rounded-lg"
                      onClick={handleDropdownItemClick}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                        />
                      </svg>
                      Model
                    </a>
                    <a
                      href="/commission/payin"
                      className="flex items-center px-4 py-2 mt-2 text-gray-500 hover:bg-safekaroDarkBlue hover:text-white hover:rounded-lg"
                      onClick={handleDropdownItemClick}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
                        />
                      </svg>
                      Pay In Excel
                    </a>
                  </div>
                )}
              </div>
            </>

            <hr className="my-3" />
            <div className="flex flex-col mt-2 ml-3 mr-3">
              <div
                className="flex items-center px-4 py-2 text-gray-500 hover:bg-safekaroDarkBlue hover:text-white hover:rounded-lg cursor-pointer"
                onClick={togglePolicyDropdown}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                  />
                </svg>
                Policy
                <i className="fas fa-chevron-down text-sm text-gray-400 ml-auto"></i>
              </div>
              {isPolicyDropdownOpen && (
                <div className="ml-6">
                  <a
                    href="/policy/motor"
                    className="flex items-center px-4 py-2 mt-2 text-gray-500 hover:bg-safekaroDarkBlue hover:text-white hover:rounded-lg"
                    onClick={handleDropdownItemClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                      />
                    </svg>
                    Add Motor Policy
                  </a>
                  <a
                    href="/policy/motor-policies"
                    className="flex items-center px-4 py-2 mt-2 text-gray-500 hover:bg-safekaroDarkBlue hover:text-white hover:rounded-lg"
                    onClick={handleDropdownItemClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25m-2.25 0h-2.25m0 0v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v4.964m12-4.006v4.006m0 0v3.75m-12-7.756v3.75m0 0h12m-12 0V14.25m12-4.5V9m0 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25m-2.25 0h-2.25m0 0v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v4.964m12-4.006v4.006m0 0v3.75m-12-7.756v3.75m0 0h12m-12 0V14.25m12-4.5V9"
                      />
                    </svg>
                    View Motor Policies
                  </a>
                </div>
              )}
            </div>
            <hr className="my-3" />
          </nav>
        </div>
        <div className="flex items-center justify-center w-10/12 ml-0 mt-6 mb-6 rounded-lg">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="rounded-full h-10 w-10 mr-3"
          />
          <div>
            <p className="text-black-600 font-semibold">Safe Karo</p>
            <p className="text-gray-500 text-sm">Admin</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
