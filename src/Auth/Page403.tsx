const Page403 = () => {
  return (
    <>
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
        />
      </svg> */}
      <div className="bg-gray-100 flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-gray-800 mb-8">403</h1>
          <p className="text-2xl font-medium text-gray-600 mb-4">
            Page Not Found
          </p>
          <p className="text-gray-500 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <a
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Login
          </a>
        </div>
      </div>
    </>
  );
};
export default Page403;
