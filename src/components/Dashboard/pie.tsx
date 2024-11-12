import React from "react";
import Header from "./components/Header";
import PieChart from "./components/PieChart";

const Pie: React.FC = () => {
  return (
    <div className="m-5">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <div className="h-3/4">
        <PieChart />
      </div>
    </div>
  );
};

export default Pie;
