//@ts-nocheck
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import CustomPagination from "../../../components/elements/CustomPagination/CustomPagination";
import LineChartTwo from "../../../components/elements/LineChart/LineChart";
import LongMenu from "../../../components/elements/LongMenu/LongMenu";
import Tabs from "../../../components/elements/Tabs/Tabs";
import {
  useGetExpenseRevenue,
  useGetExpenseRevenueChart,
} from "../../../hooks/Accounts/Accounts";
import {
  currentMonthChartFormateData,
  ProfitChartFormateData,
  totalExpenseChartFormateData,
  totalRevenueChartFormateData,
} from "../../../utils/functions";
import AddExpense from "./AddExpense";
import AddIncome from "./AddIncome";
import ChartFilterFeature from "./ChartFilterFeature";
import IvsEcards from "./IvsEcards";
import IvsEtable from "./IvsEtable";

export const IvsEFeatures = () => {
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const { data, setPage, refetch, setParams, page } = useGetExpenseRevenue();
  const chartData = useGetExpenseRevenueChart();

  const bottomSheetRef = useRef<any>(null);
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState("Monthly");

  const tabs = [
    { id: 1, label: "Table" },
    { id: 2, label: "Chart" },
  ];

  const options = [
    {
      icon: <MaterialIcons name="money" size={20} color="green" />,
      title: "Add Income",
      line: true,
      id: "view-income",
    },
    {
      icon: <MaterialIcons name="money" size={20} color="red" />,
      title: "Add Expense",
      line: false,
      id: "view-notes",
    },
  ];

  const handleOptions = (item: any) => {
    if (item.title === "Add Income") {
      setActive(1);
    } else {
      setActive(2);
    }
    setTimeout(() => {
    bottomSheetRef.current?.open?.(); 
    },300);
  };


  const [lineData, setLineData] = useState([]);
const [lineData2, setLineData2] = useState([]);
const [lineData3, setLineData3] = useState([]);
const [xAxisLabels, setXAxisLabels] = useState([]);

useEffect(() => {
  const results = chartData?.data?.results;

  if (Array.isArray(results) && results.length > 0) {
    const isNotMonthly = filter !== "Monthly";

    const formattedRevenue = totalRevenueChartFormateData(results, isNotMonthly);
    const formattedExpense = totalExpenseChartFormateData(results, isNotMonthly);
    const formattedProfit = ProfitChartFormateData(results, isNotMonthly);
    const formattedXAxis = currentMonthChartFormateData(results, isNotMonthly);

    setLineData(formattedRevenue);
    setLineData2(formattedExpense);
    setLineData3(formattedProfit);
    setXAxisLabels(formattedXAxis);
  }
}, [filter, chartData?.data?.results]); 

  return (
    <View>
      <IvsEcards />
      <View style={styles.rowBetweenCenter}>
        <Tabs
          tabs={tabs}
          setSelectedTab={setSelectedTab}
          selectedTab={selectedTab}
        />
        <LongMenu options={options} handleOptions={handleOptions} />
      </View>

      {selectedTab == 1 && data?.results?.length > 0 && (
        <>
          {data.results.map((item, index) => (
            <View key={index}>
              <IvsEtable item={item} />
            </View>
          ))}

          <CustomPagination
            gotoPage={setPage}
            totalPage={data.totalPages}
            pageIndex={page}
          />
        </>
      )}

      {selectedTab === 2 && (
        <View style={styles.margin6}>
          <View style={styles.marginBottom6}>
            <ChartFilterFeature
              setParams={chartData.setParams}
              filter={filter}
              setFilter={setFilter}
            />
          </View>
          <LineChartTwo
            xAxisLabels={xAxisLabels}
            lineData={lineData}
            lineData3={lineData3}
            lineData2={lineData2}
          />
        </View>
      )}
      {active == 1 && ( 
        <AddIncome  bottomSheetRef={bottomSheetRef} refetch={refetch} />
      )}
      {active == 2 && (
        <AddExpense bottomSheetRef={bottomSheetRef} refetch={refetch} />
      )}
    </View>
  );
};

export default IvsEFeatures;

const styles = StyleSheet.create({
  rowBetweenCenter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
  },
  margin6: {
    marginHorizontal: 24,
    marginVertical: 24,
  },
  marginBottom6: {
    marginBottom: 24,
  },
});
