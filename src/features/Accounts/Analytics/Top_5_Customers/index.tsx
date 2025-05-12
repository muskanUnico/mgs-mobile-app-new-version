import React from "react";
import { View } from "react-native";
import ReportCard from "../../ReportCard";
import Top5CustomersTable from "./Table";
import {
  useAppointmentReportFilter,
  useTopCustomer,
} from "../../../../hooks/Reports";

function Top5Customers() {
  const { customers, setParams } = useTopCustomer();
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
        title="Top 5 Customers"
        TableComponent={<Top5CustomersTable  customers={customers}  />}
      />
    </View>
  );
}

export default Top5Customers;
