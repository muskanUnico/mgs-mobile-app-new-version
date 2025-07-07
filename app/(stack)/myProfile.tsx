import Title from "@/src/components/elements/Title/Title";
import { useTheme } from "@/src/context/ThemeContext";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import MyProfileFeature from "@/src/features/MyProfile/MyProfileFeature";
import React from "react";
import { SafeAreaView } from "react-native";

const MyProfileScreen = ({ navigation }: any) => {
  const { theme } = useTheme();

  return (
    <GlobalLoader>
      <SafeAreaView
        style={[
          { backgroundColor: theme.brandGreyColor },
          { minHeight: "100%" , marginBottom:60},
        ]}
      >
        <Title navigation={navigation} title="My Profile" />
        <MyProfileFeature />
      </SafeAreaView>
    </GlobalLoader>
  );
};

export default MyProfileScreen;
