import React from "react";
import { useAuth } from "../../context/AuthContext";
import { View, Text, StyleSheet } from "react-native";
import { styles as externalStyles } from "../../assets/css";
import { useTopPopularServices } from "../../hooks/Reports";
import { useGetTodayAppointment } from "../../hooks/TimeTracker";
import LineChartTwo from "../../components/elements/LineChart/LineChart";
import { getAllApprovedAppointments } from "../../hooks/Appointment";
import {
  ProfitChartFormateData,
  currentMonthChartFormateData,
  getCountAppointmentMonthWise,
  totalExpenseChartFormateData,
  totalRevenueChartFormateData,
} from "../../utils/functions";
import {
  pieColor1,
  pieColor2,
  pieColor3,
  pieColor4,
  pieColor5,
} from "../../constants/COLORS";
import { formateDataForPieChart } from "../../utils/functions";
import { PieChart } from "react-native-gifted-charts";
import { Home } from "../../components/ui/Home/Home";
import { formatTime } from "../../utils/tools";
import { useTheme } from "../../context/ThemeContext";
import ChartHomePage from "./ChartHomePage";
import { useGetExpenseRevenueChart } from "../../hooks/Accounts/Accounts";

export const HomeChartFeature = () => {
  const styles = useStyles();
  const { user } = useAuth();
  // custom hooks
  const todaysAppointment = useGetTodayAppointment(user?.id);
  const getExpenseRevenue = useGetExpenseRevenueChart();
  const { services } = useTopPopularServices();
  const { data } = getAllApprovedAppointments();

  const palette = ["#f4a48c", "#C1846E", "#F7DED7", "#E69C81", "#F7D0BC"];
  const legendTitles = ["INCOME", "EXPENSE", "PROFIT"];

  const lineData = totalRevenueChartFormateData(
    getExpenseRevenue.data.results,
    false
  );
  const lineData2 = totalExpenseChartFormateData(
    getExpenseRevenue.data.results
  );
  const lineData3 = ProfitChartFormateData(getExpenseRevenue.data.results);
  const xAxisLabels = currentMonthChartFormateData(
    getExpenseRevenue.data.results
  );

  return (
    <>
      <View style={[externalStyles.card]}>
        <Text style={[styles.titleText, { marginBottom: 36, marginTop: 8 }]}>
          Income vs Expense
        </Text>
        <LineChartTwo
          xAxisLabels={xAxisLabels}
          lineData={lineData}
          lineData3={lineData3}
          lineData2={lineData2}
          legendTitles={legendTitles}
        />
      </View>

      <View style={[externalStyles.card]}>
        <Text style={[styles.titleText, { marginBottom: 16, marginTop: 8 }]}>
          Today's Appointment
        </Text>
        {todaysAppointment.data.length != 0 && (
          <View style={{ alignItems: "center" }}>
            {todaysAppointment.data.map((item, index) => (
              <Home
                key={index}
                number={index + 1}
                serviceTitle={item.customerId.name}
                time={`${formatTime(item.start_time_range)} - ${formatTime(
                  item.end_time_range
                )}`}
                appointmentId={item.id}
              />
            ))}
          </View>
        )}

        {!todaysAppointment.loading && todaysAppointment.data.length == 0 && (
          <View>
            <Text
              style={[
                externalStyles.label,
                { paddingVertical: 4, marginHorizontal: 4, paddingBottom: 8 },
              ]}
            >
              No appointments scheduled for today.
            </Text>
          </View>
        )}
      </View>
      <View style={[externalStyles.card]}>
        <Text style={[styles.titleText, { marginBottom: 36, marginTop: 8 }]}>
          Top Services
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PieChart
            data={formateDataForPieChart(services, [
              pieColor1,
              pieColor2,
              pieColor3,
              pieColor4,
              pieColor5,
            ])}
          />
        </View>
        <View
          style={{
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            paddingTop: 16,
          }}
        >
          {services.map((item: any, index: number) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
              }}
            >
              <View
                style={[
                  { backgroundColor: palette[index % palette.length] },
                  { borderRadius: 9999, height: 12, width: 12 },
                ]}
              ></View>
              <Text style={{ fontSize: 12, fontFamily: "Regular" }}>
                {item.service.serviceName}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[externalStyles.card]}>
        <Text style={[styles.titleText, { marginBottom: 36, marginTop: 8 }]}>
          Approved Appointments
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ChartHomePage barData={getCountAppointmentMonthWise(data.results)} />
        </View>
      </View>
    </>
  );
};

const useStyles = () => {
  const { theme } = useTheme();
  return StyleSheet.create({
    titleText: {
      color: theme.brandColor,

      fontSize: 16,
      flexWrap: "wrap",
      textShadowColor: pieColor3,
      textShadowOffset: { width: -1, height: -1 },
      textShadowRadius: 1,
      fontFamily: "BoldText",
    },
  });
};

export default HomeChartFeature;
