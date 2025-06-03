import React from "react";
import { SafeAreaView } from "react-native";
// component
import { useTheme } from "@/src/context/ThemeContext";
import RevenueReportActionTable from "@/src/features/Accounts/RevenueReport/RevenueReportActionTable";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { useLocalSearchParams } from "expo-router";
const RevenueReportActionScreen = ({ navigation, route }: any) => {
  const { theme } = useTheme();
  const { data, action } = useLocalSearchParams();
  const parsedData = JSON.parse(Array.isArray(data) ? data[0] : data);
 
  return (
    <GlobalLoader>
      <SafeAreaView
        style={[{ backgroundColor: theme.brandGreyColor },{paddingBottom:60}]}
        className="min-h-screen"
      >
        <RevenueReportActionTable route={route} navigation={navigation}  data= {parsedData} action = {action}/>
      </SafeAreaView>
    </GlobalLoader>
  );
};

export default RevenueReportActionScreen;
