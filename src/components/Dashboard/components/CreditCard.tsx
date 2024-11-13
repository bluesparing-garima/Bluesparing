import React from "react";
import Typography from "@mui/material/Typography";
import Card from "../card";
const CreditCard: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg">
      <div className="mb-4">
        <Typography variant="h5" fontWeight="600">
          My Card
        </Typography>
      </div>
      <Typography variant="subtitle1" className="text-gray-500 mb-4">
        Card Balance
      </Typography>
      <Typography
        variant="subtitle1"
        fontWeight="600"
        className="text-gray-800"
      >
        {""}
      </Typography>
      <div className="mt-4">
        <Card />
      </div>
      <div className="flex justify-around mt-4">
        <button className="bg-violet-800 text-white py-2 px-6 rounded-lg shadow-md mr-8">
          Manage Cards
        </button>
        <button className="text-black  py-2 px-4 rounded-lg shadow-md border-violet-500">
          Transfer
        </button>
      </div>
    </div>
  );
};
export default CreditCard;
