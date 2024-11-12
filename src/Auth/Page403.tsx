const Page403 = () => {
  return (
    <>
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
