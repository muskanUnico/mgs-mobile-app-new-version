import React from "react";
import { SafeAreaView } from "react-native";
import { brandGreyColor } from "@/src/constants/COLORS";
import Title from "@/src/components/elements/Title/Title";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import PaymentHistoryFeature from "@/src/features/PaymentHistory/PaymentHistoryFeature";
import { SecurePageByPackage } from "@/src/middleware/PermissionAccess";
import { useTheme } from "@/src/context/ThemeContext";

const PaymentHistoryScreen = ({ navigation }: any) => {
  const { theme } = useTheme();

  return (
    <GlobalLoader>
      <SafeAreaView
        style={[
          { backgroundColor: theme.brandGreyColor },
          { minHeight: "100%", paddingBottom: 64 },
        ]}
      >
        <Title navigation={navigation} title="Payment History" />
        <PaymentHistoryFeature />
      </SafeAreaView>
    </GlobalLoader>
  );
};

export default SecurePageByPackage(PaymentHistoryScreen, ["view_payments"]);
