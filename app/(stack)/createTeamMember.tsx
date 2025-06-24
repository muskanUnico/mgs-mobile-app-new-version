import React from "react";
import { SafeAreaView } from "react-native";
// component
import Title from "@/src/components/elements/Title/Title";
import { useTheme } from "@/src/context/ThemeContext";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import CreateMember from "@/src/features/TeamMember/CreateMember/CreateMember";

 const CreateTeamMemberScreen = ({ navigation }: any) => {
  const { theme } = useTheme();

  return (
    <GlobalLoader>
      <SafeAreaView
        style={[
          { backgroundColor: theme.brandWhiteColor },
          { minHeight: "100%", marginBottom:60 },
        ]}
      >
        <Title navigation={navigation} title="Add Team Member" />
        <CreateMember />
      </SafeAreaView>
    </GlobalLoader>
  );
};

export default  CreateTeamMemberScreen;