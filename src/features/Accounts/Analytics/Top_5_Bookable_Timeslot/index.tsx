import React from "react";
import { View } from "react-native";
import ReportCard from "../../ReportCard";
import Top5BookableTimeslotTable from "./Table/Index";
import {
  useAppointmentReportFilter,
  useMostBookableTimeslots,
} from "../../../../hooks/Reports";

function Top5BookableTimeslot() {
  const { timeslots, setParams } = useMostBookableTimeslots();
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
        HandleResetFilter={HandleResetFilter}
        setFilter={setFilter}
        filter={filter}
        title={"Top 5 Time Slots"}
        TableComponent={
        <Top5BookableTimeslotTable timeslots={timeslots}  />}
      />
    </View>
  );
}

export default Top5BookableTimeslot;
