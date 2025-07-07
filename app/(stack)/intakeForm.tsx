import { useTheme } from "@/src/context/ThemeContext";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import IntakeFormFeature from "@/src/features/IntakeForm/IntakeFormFeature";
import React from "react";
import { Dimensions, SafeAreaView } from "react-native";

const IntakeFormScreen = ({navigation, route }: any) => {
  const { theme } = useTheme();
 const screenHeight = Dimensions.get('window').height;
  return (
    <GlobalLoader>
      <SafeAreaView
        style={{ backgroundColor: theme.brandWhiteColor,  minHeight: screenHeight,paddingBottom:60 }}

      >
        <IntakeFormFeature navigation={navigation} route={route} />
      </SafeAreaView>
    </GlobalLoader>
  );
};

export default IntakeFormScreen;
