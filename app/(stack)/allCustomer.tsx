import React from "react";
import { SafeAreaView } from "react-native";
// component
import Title from "@/src/components/elements/Title/Title";
import { brandGreyColor } from "@/src/constants/COLORS";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { SecurePageByPackage } from "@/src/middleware/PermissionAccess";
import { ViewCustomers } from "@/src/features/Customer/ViewCustomer/ViewCustomers";
import { useTheme } from "@/src/context/ThemeContext";

const AllCustomerScreen = ({ navigation, route }: any) => {
  const { theme } = useTheme();

  return (
    <GlobalLoader>
      <SafeAreaView
        style={[
          { backgroundColor: theme.brandGreyColor },
          { minHeight: "100%" },
        ]}
      >
        <Title navigation={navigation} title="All Customers" />
        <ViewCustomers />
      </SafeAreaView>
    </GlobalLoader>
  );
};

export default SecurePageByPackage(AllCustomerScreen, ["view_customers"]);
