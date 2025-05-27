import React from "react";
import { SafeAreaView } from "react-native";
// component
import Title from "@/src/components/elements/Title/Title";
import { useTheme } from "@/src/context/ThemeContext";
import RevenueReportFeatures from "@/src/features/Accounts/RevenueReport/RevenueReportFeatures";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { SecurePageByPackage } from "@/src/middleware/PermissionAccess";

 const RevenueReportScreen = ({ navigation}: any) => {
  const { theme } = useTheme();

  return (
    <GlobalLoader>
      <SafeAreaView
      style={[{ backgroundColor: theme.brandGreyColor }, { minHeight: '100%' }]}

      >
        <Title navigation={navigation} title="Revenue Report" />
        <RevenueReportFeatures navigation={navigation} />
      </SafeAreaView>
    </GlobalLoader>
  );
};

export default SecurePageByPackage(RevenueReportScreen, ["manage_sales_revenue_report"]);
