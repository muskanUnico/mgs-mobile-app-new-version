import React from "react";
import { SafeAreaView } from "react-native";
// component
import GlobalLoader from "@/src//features/GlobalLoader/GlobalLoader";
import Title from "@/src/components/elements/Title/Title";
import { useTheme } from "@/src/context/ThemeContext";
import { TeamMemberAllCards } from "@/src/features/TeamMember/TeamMemberAllCards/TeamMemberAllCards";

const team =  ({ navigation, route }: any) => {
  const { theme } = useTheme();

  return (
    <GlobalLoader>
      <SafeAreaView
        style={[
          { backgroundColor: theme.brandGreyColor },
          { minHeight: "100%" },
        ]}
      >
        <Title navigation={navigation} title="All Team Members" />
        <TeamMemberAllCards />
      </SafeAreaView>
    </GlobalLoader>
  );
};
export default team