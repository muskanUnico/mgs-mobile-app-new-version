import React from "react";
import { SafeAreaView } from "react-native";
import { brandGreyColor } from "@/src//constants/COLORS";
import Title from "@/src/components/elements/Title/Title";
import MyProfileFeature from "@/src/features/MyProfile/MyProfileFeature";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { useTheme } from "@/src/context/ThemeContext";

const MyProfileScreen = ({ navigation }: any) => {
  const { theme } = useTheme();

  return (
    <GlobalLoader>
      <SafeAreaView
        style={[
          { backgroundColor: theme.brandGreyColor },
          { minHeight: "100%" },
        ]}
      >
        <Title navigation={navigation} title="My Profile" />
        <MyProfileFeature />
      </SafeAreaView>
    </GlobalLoader>
  );
};

export default MyProfileScreen;
