import React from "react";
import StatCard from "./StatCard";

function Stats() {
  const stats = [
    { id: 1, title: "+17K", description: "The number of houses" },
    { id: 2, title: "+5K", description: "The number of products" },
    { id: 3, title: "10+", description: "Years of experience" },
    { id: 4, title: "24/7", description: "Customer support" },
  ];
  return (
    <div className="grid grid-cols-2 gap-5">
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          title={stat.title}
          description={stat.description}
        />
      ))}
    </div>
  );
}

export default Stats;
