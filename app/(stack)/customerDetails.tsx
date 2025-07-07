import { useTheme } from "@/src/context/ThemeContext";
import CustomerDetails from "@/src/features/Customer/CustomerDetails/CustomerDetails";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Dimensions, SafeAreaView } from "react-native";

const CustomerScreen = ({ navigation, route }: any) => {
  const { theme } = useTheme();
  const { height: screenHeight } = Dimensions.get("window");
  const { customerId } = useLocalSearchParams();
  return (
    <GlobalLoader>
      <SafeAreaView
        style={{
          minHeight: screenHeight,
          paddingBottom: 64, 
          backgroundColor: theme.brandGreyColor,
        }}
      >
        <CustomerDetails navigation={navigation} route={route} customerId={customerId} />
      </SafeAreaView>
    </GlobalLoader>
  );
};

export default CustomerScreen;
