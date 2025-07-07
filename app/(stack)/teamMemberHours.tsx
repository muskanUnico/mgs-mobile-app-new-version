import { useTheme } from "@/src/context/ThemeContext";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import TeamMemberHours from "@/src/features/TeamMember/TeamMemberHours";
import React from "react";
import { SafeAreaView } from "react-native";

import { RouteProp } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";

type TeamMemberHoursProps = {
  route: RouteProp<Record<string, object | undefined>, string>;
  user: string | string[];
};

const teamMemberHours: React.FC<TeamMemberHoursProps> = ({ route }) => {
  const { theme } = useTheme();
  const { user } = useLocalSearchParams();
  const parsedUser = typeof user === "string" ? JSON.parse(user) : user;
  return (
    <GlobalLoader>
      <SafeAreaView
        style={[
          { backgroundColor: theme.brandGreyColor },
          { minHeight: "100%", marginBottom: 60 },
        ]}
      >
        <TeamMemberHours route={route} user={parsedUser} />
      </SafeAreaView>
    </GlobalLoader>
  );
};

export default teamMemberHours;
