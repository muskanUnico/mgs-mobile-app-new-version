//@ts-nocheck
import { useTheme } from "@/src/context/ThemeContext";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import RequestLeaveFeature from "@/src/features/LeaveCalender/RequestLeaveFeature";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Dimensions, FlatList, SafeAreaView } from "react-native";

const RequestLeaveScreen = ({ navigation, route }: any) => {
  const { theme } = useTheme();
  const { item } = useLocalSearchParams();

  let parsedItem = null;
  try {
    parsedItem = JSON.parse(item);
  } catch (err) {
    console.warn("Invalid JSON item:", item);
  }
  const screenHeight = Dimensions.get("window").height;

  return (
    <GlobalLoader>
      <SafeAreaView
        style={{
          flex: 1,
          minHeight: screenHeight,
          backgroundColor: theme.brandWhiteColor,
          paddingBottom:60
        }}
      >
        <FlatList
          ListHeaderComponent={
            <RequestLeaveFeature
              navigation={navigation}
              route={route}
              item={parsedItem}
            />
          }
        />
      </SafeAreaView>
    </GlobalLoader>
  );
};
export default RequestLeaveScreen;
