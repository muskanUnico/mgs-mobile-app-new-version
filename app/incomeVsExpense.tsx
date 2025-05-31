import React from "react";
import { SafeAreaView } from "react-native";
// component
import Title from "@/src/components/elements/Title/Title";
import { useTheme } from "@/src/context/ThemeContext";
import { IvsEFeatures } from "@/src/features/Accounts/IvsE/IvsEFeatures";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { SecurePageByPackage } from "@/src/middleware/PermissionAccess";

 const IncomeVsExpenseScreen = ({ navigation, route }: any) => {
  const { theme } = useTheme();

  return (
    <GlobalLoader>
      <SafeAreaView
     style={[{ backgroundColor: theme.brandGreyColor }, { minHeight: '100%' }]}

      >
        <Title navigation={navigation} title="Income vs Expense Report" />
        <IvsEFeatures />
      </SafeAreaView>
    </GlobalLoader>
  );
};

export default SecurePageByPackage(IncomeVsExpenseScreen, ["view_income_vs_expense_report"]);

