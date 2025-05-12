import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useGetTimeTracker } from "../../hooks/TimeTracker";
import { View } from "react-native";
import CustomPagination from "../../components/elements/CustomPagination/CustomPagination";
import MyPayrollCard from "./MyPayrollCard";

const MyPayroll = () => {
  const { user } = useAuth();
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    teamMemberId: user?.id,
  });

  const { timeData, setPage } = useGetTimeTracker(setParams, params);

  return (
    <View>
      {timeData.results.map((item, index) => {
        return <MyPayrollCard item={item} key={index} index={index} />;
      })}
      <CustomPagination setPage={setPage} totalPage={timeData.totalPages} />
    </View>
  );
};

export default MyPayroll;
