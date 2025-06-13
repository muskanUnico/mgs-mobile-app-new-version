import moment from "moment";
import ChatFilterUI from "./ChatFilterUI";
// react
import React, { useEffect, useState } from "react";
// utils
import { formatDateForFilter, getLastDate } from "../../../utils/tools";


const ChartFilterFeature = ({ setParams, setFilter, filter }) => {
  // filter logic
  const [chooseOptions, setChooseOption] = useState("fixed");

  //---------------- Date Range (start) ---------------
  const [dateRange, setDateRange] = useState({
    from: moment().subtract(1, 'months').toDate(),
    to: new Date(),
  });

  useEffect(() => {
    handleResetFilter();
}, []);

  useEffect(() => {
    if (chooseOptions == "fixed") {
      setParams({
        from: getLastDate(filter),
        to: moment().format("YYYY-MM-DD"),
      });
    } else {
      setParams({
        from: formatDateForFilter(dateRange.from),
        to: formatDateForFilter(dateRange.to),
      });
    }
  }, [dateRange, filter]);

  // handle reset filter button
  const handleResetFilter = () => {
    setFilter("");
    setDateRange({
      from: moment().subtract(1, 'months').toDate(),
      to: new Date(),
    });
  };

  return (
    <ChatFilterUI
      setDateRange={setDateRange}
      dateRange={dateRange}
      setFilter={setFilter}
      filter={filter}
      HandleResetFilter={handleResetFilter}
      setChooseOption={setChooseOption}
      chooseOptions={chooseOptions}
    />
  );
};

export default ChartFilterFeature;
