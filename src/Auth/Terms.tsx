import React, { useState } from "react";

const TermsModal = ({ isOpen, onClose, onAccept }:any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Terms and Conditions</h2>
        <p className="text-sm mb-4">
          By signing up, you agree to abide by our rules and policies. Please
          read and accept the terms before proceeding.
        </p>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="termsCheckbox"
            className="mr-2"
            onChange={(e) => onAccept(e.target.checked)}
          />
          <label htmlFor="termsCheckbox" className="text-sm">
            I have read and accept the Terms and Conditions.
          </label>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <div className="p-6">
      <button
        onClick={() => setIsTermsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Open Terms & Conditions
      </button>

      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        onAccept={(accepted: boolean | ((prevState: boolean) => boolean)) => {
          setTermsAccepted(accepted);
          if (accepted) {
            localStorage.setItem("termsAccepted", "true");
          }
        }}
      />
    </div>
  );
};

export default App;
