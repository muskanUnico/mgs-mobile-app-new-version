import Title from "@/src/components/elements/Title/Title";
import { useTheme } from "@/src/context/ThemeContext";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { AddPayrollFeature } from "@/src/features/TeamMember/ManagePayroll/AddPayrollFeature";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

const AddPayrollScreen = ({ navigation, route }: any) => {
  const { theme } = useTheme();
  const { edit, rootItem } = useLocalSearchParams();
  const isEdit = String(edit).toLowerCase() === "true";

  const itemData = JSON.parse(rootItem  as string) || {};

  console.log("Decoded item:", itemData);

  return (
    <GlobalLoader>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.brandWhiteColor,
          paddingBottom: 40,
        }}
      >
        <Title navigation={navigation} title="Add Custom Data" />
        <AddPayrollFeature route={route} isEdit={isEdit} item={itemData} />
      </SafeAreaView>
    </GlobalLoader>
  );
};

export default AddPayrollScreen;
