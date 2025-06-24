import EditCommentFeature from "@/src/features/Appointment/ViewAppointment/EditCommentFeature/EditCommentFeature";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

const EditCommentScreen = ({ navigation, route }: any) => {
  const { item } = useLocalSearchParams();

  const parsedItem = typeof item === "string" ? JSON.parse(item) : JSON.parse(item[0]);



  return (
    <GlobalLoader>
      <SafeAreaView>
        <EditCommentFeature route={route} navigation={navigation} item={parsedItem} />
      </SafeAreaView>
    </GlobalLoader>
  );
};

export default EditCommentScreen;
