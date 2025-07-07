import Title from "@/src/components/elements/Title/Title";
import { useTheme } from "@/src/context/ThemeContext";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { WorkedHoursFeature } from "@/src/features/TeamMember/ManagePayroll/WorkedHoursFeature";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Dimensions, SafeAreaView } from "react-native";

const WorkedHoursScreen = ({navigation, route}:any) => {
  const { theme } = useTheme();
  const {item} = useLocalSearchParams();
  const parsedItem = JSON.parse(Array.isArray(item) ? item[0] : item);
  const screenHeight = Dimensions.get("window").height;

  return (
    <GlobalLoader>
      <SafeAreaView  style={{ backgroundColor: theme.brandGreyColor, minHeight: screenHeight,
         paddingBottom: 60 }}>
        <Title navigation={navigation} title="Worked Hours Detail" />
        <WorkedHoursFeature navigation={navigation} route={route} item={parsedItem}/>
      </SafeAreaView>
    </GlobalLoader>
  );
};

export default WorkedHoursScreen;
