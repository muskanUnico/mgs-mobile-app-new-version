import React from "react";
import { View } from "react-native";
import ReportCard from "../../ReportCard";
import Top5ServicesTable from "./Table";
import {
  useAppointmentReportFilter,
  useTopPopularServices,
} from "../../../../hooks/Reports";

function Top5Services() {
  // integration hook
  const { services, setParams } = useTopPopularServices();
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
      <ReportCard
        title="Top 5 Popular Services"
        setDateRange={setDateRange}
        dateRange={dateRange}
        setFilter={setFilter}
        filter={filter}
        HandleResetFilter={HandleResetFilter}
        TableComponent={<Top5ServicesTable services={services} />}
      />
  );
}

export default Top5Services;
