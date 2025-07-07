//@ts-nocheck
import React from "react";
import { FlatList } from "react-native";
// component
import { useTheme } from "@/src/context/ThemeContext";
import { ViewTeamMember } from "@/src/features/TeamMember/ViewTeamMember/ViewTeamMember";
import { useLocalSearchParams } from "expo-router";

const ViewTeamMemberScreen = ({ navigation, route }: any) => {
  const { theme } = useTheme();
  const {memberId} = useLocalSearchParams();

  return (
      <FlatList
        ListHeaderComponent={
          <ViewTeamMember navigation={navigation} route={route} memberId={memberId}  />
        }
        style={{flex:1, backgroundColor: theme.brandGreyColor }}
        
      />
  );
};

export default ViewTeamMemberScreen;