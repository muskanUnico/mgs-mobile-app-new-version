import React from "react";
import { SafeAreaView } from "react-native";
// component
import Title from "@/src/components/elements/Title/Title";
import { brandGreyColor } from "@/src/constants/COLORS";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { TeamMemberAllCards } from "@/src/features/TeamMember/TeamMemberAllCards/TeamMemberAllCards";

const AllTeamMemberScreen = ({ navigation, route }: any) => {
//   const { theme } = useTheme();

  return (
    <GlobalLoader>
      <SafeAreaView
        style={[
          { backgroundColor:brandGreyColor },
          { minHeight: "100%" },
        ]}
      >
        <Title navigation={navigation} title="All Team Members" />
        <TeamMemberAllCards />
      </SafeAreaView>
    </GlobalLoader>
  );
};

export default AllTeamMemberScreen;