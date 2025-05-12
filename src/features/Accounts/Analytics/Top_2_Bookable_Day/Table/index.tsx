import React from "react";
import Top2BookableDaysCard from "../Top2BookableDaysCard/Top2BookableDaysCard";

const Top2BookableDaysTable = ({ days }: any) => {
  return days.map((item: any, index: number) => {
    return <Top2BookableDaysCard index={index} item={item} key={index} />;
  });
};


export default Top2BookableDaysTable;
