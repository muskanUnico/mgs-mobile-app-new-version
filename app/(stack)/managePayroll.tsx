import React from "react";
import { SafeAreaView } from "react-native";
// component
import Title from "@/src/components/elements/Title/Title";
import { useTheme } from "@/src/context/ThemeContext";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import ManagePayrollfeature from "@/src/features/TeamMember/ManagePayroll/ManagePayrollfeature";

const ManagePayrollScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
 
  return (
    <GlobalLoader>
      <SafeAreaView
        style={[
          { backgroundColor: theme.brandGreyColor },
          { minHeight: "100%", marginBottom:60 },
        ]}
      >
        <Title navigation={navigation} title="Manage Payroll" />
        <ManagePayrollfeature navigation={navigation} />
      </SafeAreaView>
    </GlobalLoader>
  );
};


export default ManagePayrollScreen;