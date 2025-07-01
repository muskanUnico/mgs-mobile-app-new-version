import React from "react";
import { SafeAreaView } from "react-native";
// component
import Title from "@/src/components/elements/Title/Title";
import { useTheme } from "@/src/context/ThemeContext";
import { CmsFeature } from "@/src/features/Cms/CmsFeature";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";

const CmsScreen = ({ navigation, route }: any) => {
  const { theme } = useTheme();
  return (
    <GlobalLoader>
      <SafeAreaView
        style={[
          { backgroundColor: theme.brandWhiteColor },
          { minHeight: "100%" , paddingBottom:60},
        ]}
      >
        <Title navigation={navigation} title="CMS" />
        <CmsFeature />
      </SafeAreaView>
    </GlobalLoader>
  );
};
export default   CmsScreen ;