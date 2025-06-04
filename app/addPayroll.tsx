import Title from "@/src/components/elements/Title/Title";
import { useTheme } from "@/src/context/ThemeContext";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { AddPayrollFeature } from "@/src/features/TeamMember/ManagePayroll/AddPayrollFeature";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

const AddPayrollScreen = ({ navigation, route }: any) => {
  const { theme } = useTheme();
  const  {edit }  = useLocalSearchParams();
  const isEdit = edit==="true";

  return (
    <GlobalLoader>
      <SafeAreaView
        className="min-h-screen pb-16"
        style={{ backgroundColor: theme.brandWhiteColor }}
      >
        <Title navigation={navigation} title="Add Custom Data" />
        <AddPayrollFeature route={route} isEdit={isEdit} />
      </SafeAreaView>
    </GlobalLoader>
  );
};

export default AddPayrollScreen;
