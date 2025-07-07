import React from "react";
import { SafeAreaView } from "react-native";
import { brandGreyColor } from "@/src/constants/COLORS";
import CustomerDetails from "@/src/features/Customer/CustomerDetails/CustomerDetails";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { useTheme } from "@/src/context/ThemeContext";

const CustomerScreen = ({ navigation, route }: any) => {
  const { theme } = useTheme();

  return (
    <GlobalLoader>
      <SafeAreaView
        style={[
          { backgroundColor: theme.brandGreyColor },
          { paddingBottom: 64, minHeight: "100%" },
        ]}
      >
        <CustomerDetails navigation={navigation} route={route} />
      </SafeAreaView>
    </GlobalLoader>
  );
};

export default CustomerScreen;
