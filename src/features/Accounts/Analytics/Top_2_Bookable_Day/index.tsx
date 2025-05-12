import React from "react";
import { View } from "react-native";
import ReportCard from "../../ReportCard";
import Top2BookableDaysTable from "./Table";
import {
  useAppointmentReportFilter,
  useMostBookableDays,
} from "../../../../hooks/Reports";

function Top2BookableDays() {
  const { days, setParams } = useMostBookableDays();
  // filter hook
  const { setFilter, setDateRange, dateRange, filter } =
  useAppointmentReportFilter(setParams);

 const HandleResetFilter = () => {
   setFilter("none");
   setDateRange({
     from: null,
     to: null,
   });
 };

  return (
    <View>
      <ReportCard
        setDateRange={setDateRange}
        dateRange={dateRange}
        setFilter={setFilter}
        filter={filter}
        HandleResetFilter={HandleResetFilter}
        title={"Top 2 Bookable Days"}
        TableComponent={<Top2BookableDaysTable  days={days}  />}
      />
    </View>
  );
}

export default Top2BookableDays;
