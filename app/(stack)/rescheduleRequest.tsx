//@ts-nocheck
import RescheduleRequest from "@/src/features/Appointment/ViewAppointment/RescheduleRequest/RescheduleRequest";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

const RescheduleRequestScreen = ({ navigation, route }) => {
    const {id} = useLocalSearchParams();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GlobalLoader>
        <RescheduleRequest navigation={navigation} route={route} id={id} />
      </GlobalLoader>
    </SafeAreaView>
  );
};

export default RescheduleRequestScreen;
