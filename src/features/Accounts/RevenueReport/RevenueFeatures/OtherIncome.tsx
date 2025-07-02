import React, { useRef, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Switch } from "react-native-paper";
import { styles as externalStyles } from "../../../../assets/css";
import BarThreeD from "../../../../components/elements/BarChart/BarChart";
import Button from "../../../../components/elements/Button/Button";
import CustomPagination from "../../../../components/elements/CustomPagination/CustomPagination";
import RevenueTable from "../../../../components/ui/Report/RevenueReport/RevenueTable";
import { borderColor } from "../../../../constants/COLORS";
import { useTheme } from "../../../../context/ThemeContext";
import {
  useGetOtherRevenue,
  useGetOtherRevenueChart,
} from "../../../../hooks/Accounts/Revenue";
import { formateSalesChartData } from "../../../../utils/functions";
import AddIncome from "../../IvsE/AddIncome";
import ChartFilterFeature from "../../IvsE/ChartFilterFeature";

const OtherIncomeFeature = ({ navigation }: any) => {
  const { theme } = useTheme();
  const bottomSheetRef = useRef<any>(null);
  const { revenue, setPage, refetch, page } = useGetOtherRevenue();

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const { chart, setParams } = useGetOtherRevenueChart();
  const [filter, setFilter] = useState("Monthly");
  const chartData = formateSalesChartData(chart, "other");

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
          onValueChange={() => setIsSwitchOn(!isSwitchOn)}
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
          title="Add Income"
          onPress={() => {
            bottomSheetRef.current.open();
          }}
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
            return <RevenueTable item={item} key={index} action={true} />;
          })}

          <CustomPagination
            totalPage={revenue.totalPages}
            gotoPage={setPage}
            pageIndex={page}
          />
        </>
      )}
      <AddIncome
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

export default OtherIncomeFeature;
