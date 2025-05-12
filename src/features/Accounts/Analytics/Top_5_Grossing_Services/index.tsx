import React from "react";
import { View } from "react-native";
import ReportCard from "../../ReportCard";
import Top5GrossingServicesTable from "./Table";
import { useAppointmentReportFilter, useGrossingServices } from "../../../../hooks/Reports";
import moment from "moment";

function Top5GrossingServices() {

    // integration hook
    const { gross, setParams } = useGrossingServices();
    // filter hook
    const { setFilter, setDateRange, dateRange, filter } =
      useAppointmentReportFilter(setParams);
  
    const HandleResetFilter = () => {
      setFilter("none");
      setDateRange({
        from: moment().subtract(1, 'months').toDate(),
        to: new Date(),
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
        title={"Top 5 Grossing Services "}
        TableComponent={<Top5GrossingServicesTable gross={gross} />}
      />
    </View>
  );
}

export default Top5GrossingServices;
