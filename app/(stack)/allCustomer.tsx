import React from "react";
import { SafeAreaView } from "react-native";
// component
import Title from "@/src/components/elements/Title/Title";
import { useTheme } from "@/src/context/ThemeContext";
import { ViewCustomers } from "@/src/features/Customer/ViewCustomer/ViewCustomers";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { SecurePageByPackage } from "@/src/middleware/PermissionAccess";

const AllCustomerScreen = ({ navigation, route }: any) => {
  const { theme } = useTheme();

  return (
    <GlobalLoader>
      <SafeAreaView
        style={[
          { backgroundColor: theme.brandGreyColor },
          { minHeight: "100%" , paddingBottom:60},
        ]}
      >
        <Title  title="All Customers" />
        <ViewCustomers />
      </SafeAreaView>
    </GlobalLoader>
  );
};

export default SecurePageByPackage(AllCustomerScreen, ["view_customers"]);
