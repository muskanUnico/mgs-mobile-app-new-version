import React from "react";
import Top5BookableTimeslotCard from "../ Top5BookableTimeslotCard/ Top5BookableTimeslotCard";

const Top5BookableTimeslotTable = ({ timeslots }: any) => {
  return timeslots.map((item: any, index: any) => {
    return <Top5BookableTimeslotCard item={item} index={index} key={index} />;
  });
};

export default Top5BookableTimeslotTable;
