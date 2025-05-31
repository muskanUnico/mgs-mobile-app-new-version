import React, { useCallback, useRef } from "react";
import { SafeAreaView, ScrollView } from "react-native";
// component
import Title from "@/src/components/elements/Title/Title";
import { useTheme } from "@/src/context/ThemeContext";
import Bottom5Services from "@/src/features/Accounts/Analytics/Bottom_5_Services";
import Top2BookableDays from "@/src/features/Accounts/Analytics/Top_2_Bookable_Day";
import Top5BookableTimeslot from "@/src/features/Accounts/Analytics/Top_5_Bookable_Timeslot";
import Top5Customers from "@/src/features/Accounts/Analytics/Top_5_Customers";
import Top5GrossingServices from "@/src/features/Accounts/Analytics/Top_5_Grossing_Services";
import Top5Services from "@/src/features/Accounts/Analytics/Top_5_Services";
import Top5TeamMembers from "@/src/features/Accounts/Analytics/Top_5_Team_Members";
// import AppointmentReportFeatures from "@/src/features/Accounts/AppointmentReport/AppointmentReportFeatures";
import AppointmentReportFeatures from "@/src/features/Accounts/AppointmentReport/AppointmentReportFeatures";
import { SecurePageByPackage } from "@/src/middleware/PermissionAccess";
import { useFocusEffect } from "@react-navigation/native";

const AppointmentReportScreen = ({ navigation, route }: any) => {
  const scrollViewRef = useRef(null);
  const { theme } = useTheme();

  useFocusEffect(
    useCallback(() => {
      // if (route.params?.ScrollDown) {
      //   //@ts-ignore
        // scrollViewRef.current?.scrollToEnd({ animated: true });               //needed to fix
      // }
    }, [])
  );

  return (
    <ScrollView ref={scrollViewRef}>
      <SafeAreaView
        style={[
          { backgroundColor: theme.brandGreyColor },
          { minHeight: "100%" },
        ]}
      >
        <Title title="Appointment Report" navigation={navigation} />
        <AppointmentReportFeatures />
        <Top5Services />
        <Top5GrossingServices />

        <Bottom5Services />
        <Top5TeamMembers />
        <Top5BookableTimeslot />
        <Top2BookableDays />
        <Top5Customers />
      </SafeAreaView>
    </ScrollView>
  );
};

export default SecurePageByPackage(AppointmentReportScreen, [
  "appointment_report",
]);
