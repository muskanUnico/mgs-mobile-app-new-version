import Title from "@/src/components/elements/Title/Title";
import { useTheme } from "@/src/context/ThemeContext";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { TipCollectedFeature } from "@/src/features/TeamMember/ManagePayroll/TipCollectedFeature";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Dimensions, SafeAreaView } from "react-native";

const TipCollectedScreen = ({ navigation, route }: any) => {
  const { theme } = useTheme();
  const screenHeight = Dimensions.get("window").height;
    const {item} = useLocalSearchParams();
    const parsedItem = JSON.parse(Array.isArray(item) ? item[0] : item);

  return (
    <GlobalLoader>
      <SafeAreaView
        style={{ backgroundColor: theme.brandGreyColor, minHeight: screenHeight,
         paddingBottom: 60  }}
      >
        <Title navigation={navigation} title="Tip Collected" />
        <TipCollectedFeature navigation={navigation} route={route} item={parsedItem}/>
      </SafeAreaView>
    </GlobalLoader>
  );
};

export default TipCollectedScreen;
