import React from "react";
import { View } from "react-native";
import ReportCard from "../../ReportCard";
import Top5TeamMembersTable from "./Table";
import {
  useAppointmentReportFilter,
  useTopMembers,
} from "../../../../hooks/Reports";

function Top5TeamMembers() {
  const { members, setParams } = useTopMembers();
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
        title={"Top 5 Team Members "}
        TableComponent={<Top5TeamMembersTable members={members} />}
      />
    </View>
  );
}

export default Top5TeamMembers;
