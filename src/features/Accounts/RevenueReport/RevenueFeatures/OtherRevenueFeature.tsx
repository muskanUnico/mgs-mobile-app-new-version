import AddExpense from "../../IvsE/AddExpense";
import { Switch } from "react-native-paper";
import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { borderColor } from "../../../../constants/COLORS";
import { styles as externalStyles } from "../../../../assets/css";
import Button from "../../../../components/elements/Button/Button";
import { useGetOtherRevenueChart } from "../../../../hooks/Accounts/Revenue";
import RevenueTable from "../../../../components/ui/Report/RevenueReport/RevenueTable";
import CustomPagination from "../../../../components/elements/CustomPagination/CustomPagination";
import BarThreeD from "../../../../components/elements/BarChart/BarChart";
import { formateSalesChartData } from "../../../../utils/functions";
import ChartFilterFeature from "../../IvsE/ChartFilterFeature";
import { useTheme } from "../../../../context/ThemeContext";
import {
  useGetOtherExpense,
  useGetOtherExpenseChart,
} from "../../../../hooks/Accounts/Expense";

const OtherRevenueFeature = ({ navigation }: any) => {
  const bottomSheetRef = useRef<any>(null);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const { revenue, setPage, refetch, page } = useGetOtherExpense();

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const [filter, setFilter] = useState("Monthly");
  const { chart, setParams } = useGetOtherExpenseChart();

  const chartData = formateSalesChartData(chart, "other");
  const { theme } = useTheme();

  // console.log("chart  ====>>>>", chart);
  // console.log("chartData  ====>>>>", chartData);

  return (
    <View>
      <View
        style={[styles.switchContainer, { marginHorizontal: 24, marginTop: 4 }]}
      >
        <Text style={[externalStyles.label, { color: theme.brandColor }]}>
          TABULAR VIEW
        </Text>
        <Switch
          value={isSwitchOn}
          onValueChange={onToggleSwitch}
          thumbColor={
            isSwitchOn ? theme.brandPastelColor : theme.brandGreyColor
          }
          trackColor={{ true: theme.brandColor, false: borderColor }}
          style={[styles.switch, { marginHorizontal: 4 }]}
        />
        <Text style={[externalStyles.label, { color: theme.brandColor }]}>
          CHART VIEW
        </Text>
      </View>

      <View style={{ marginHorizontal: 24, marginBottom: 12, marginTop: 4 }}>
        <Button
          title="Add Expense"
          onPress={() => bottomSheetRef.current.open()}
        />
      </View>

      {isSwitchOn ? (
        <View style={{ marginHorizontal: 24, marginVertical: 24 }}>
          <View style={{ marginBottom: 24 }}>
            <ChartFilterFeature
              setParams={setParams}
              filter={filter}
              setFilter={setFilter}
            />
          </View>
          <BarThreeD barData={chartData} />
        </View>
      ) : (
        <>
          {revenue.results.map((item, index) => {
            return (
              <RevenueTable
                navigation={navigation}
                item={item}
                index={index}
                key={index}
                action={true}
              />
            );
          })}

          <CustomPagination
            totalPage={revenue.totalPages}
            gotoPage={setPage}
            pageIndex={page}
          />
        </>
      )}
      <AddExpense
        navigation={navigation}
        bottomSheetRef={bottomSheetRef}
        refetch={refetch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewLabel: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  switch: {
    ...(Platform.OS === "ios" && {
      transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    }),
  },
});

export default OtherRevenueFeature;
