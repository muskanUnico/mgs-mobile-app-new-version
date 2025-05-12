import React from "react";
import { View } from "react-native";
import ReportCard from "../../ReportCard";
import Bottom5ServicesTable from "./Table";
import {
  useAppointmentReportFilter,
  useLowServices,
} from "../../../../hooks/Reports";

function Bottom5Services() {
  const { services, setParams } = useLowServices();
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
        HandleResetFilter={HandleResetFilter}
        filter={filter}
        title={"Bottom 5 Services"}
        TableComponent={<Bottom5ServicesTable services={services} />}
      />
    </View>
  );
}

export default Bottom5Services;
