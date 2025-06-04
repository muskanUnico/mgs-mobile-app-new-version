//@ts-nocheck
import React from "react";
import { FlatList } from "react-native";
// component
import { useTheme } from "@/src/context/ThemeContext";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { ViewTeamMember } from "@/src/features/TeamMember/ViewTeamMember/ViewTeamMember";
import { useLocalSearchParams } from "expo-router";

const ViewTeamMemberScreen = ({ navigation, route }: any) => {
  const { theme } = useTheme();
  const {memberId} = useLocalSearchParams();

  return (
    <GlobalLoader>
      <FlatList
        ListHeaderComponent={
          <ViewTeamMember navigation={navigation} route={route} memberId={memberId}  />
        }
        style={{ backgroundColor: theme.brandGreyColor }}
        className="min-h-screen"
      />
    </GlobalLoader>
  );
};

export default ViewTeamMemberScreen;