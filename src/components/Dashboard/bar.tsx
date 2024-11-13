import React from "react";
import Header from "./components/Header";
import BarChart from "./components/BarChart";

const Bar: React.FC = () => {
  return (
    <div className="m-5">
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <div className="h-3/4">
        <BarChart />
      </div>
    </div>
  );
};

export default Bar;
