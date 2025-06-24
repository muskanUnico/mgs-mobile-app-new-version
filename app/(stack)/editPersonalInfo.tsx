import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import EditPersonalInfo from "@/src/features/TeamMember/EditPersonalInfo/EditPersonalInfo";
import { useLocalSearchParams } from 'expo-router';
import React from "react";
import { SafeAreaView } from "react-native";

const EditPersonalInfoScreen = ({ navigation, route }: any) => {
     const { personalInfo } = useLocalSearchParams();

  const parsedInfo = personalInfo
    ? JSON.parse(decodeURIComponent(Array.isArray(personalInfo) ? personalInfo[0] : personalInfo))
    : null;
  return (
    <GlobalLoader>
      <SafeAreaView style={{ flex: 1, paddingBottom:30 }}>
        <EditPersonalInfo navigation={navigation} route={route} personalInfo={personalInfo}/>
      </SafeAreaView>
    </GlobalLoader>
  );
};
export default EditPersonalInfoScreen;

