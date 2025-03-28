import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Terms = () => {
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  const handleAccept = () => {
    if (accepted) {
      localStorage.setItem("termsAccepted", "true");
      navigate("/signup"); // Redirect back to signup
    } else {
      alert("Please accept the terms to continue.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-bold mb-4">Terms and Conditions</h2>
      <p className="text-sm mb-4">
        By signing up, you agree to abide by our rules and policies. Please read
        and accept the terms before proceeding.
      </p>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="termsCheckbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="termsCheckbox" className="text-sm">
          I have read and accept the Terms and Conditions.
        </label>
      </div>
      <button
        onClick={handleAccept}
        className={`w-full p-2 rounded text-white ${
          accepted ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400"
        }`}
      >
        Accept and Continue
      </button>
    </div>
  );
};

export default Terms;
