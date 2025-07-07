import { brandWhiteColor } from "@/src/constants/COLORS";
import EditAppointment from "@/src/features/Appointment/EditAppointment/EditAppointment";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { SecurePageByPackage } from "@/src/middleware/PermissionAccess";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

const EditAppointmentScreen = ({ navigation }: any) => {

 const {id} = useLocalSearchParams();
  return (
    <GlobalLoader>
      <SafeAreaView
        style={[
          { backgroundColor:brandWhiteColor },
          { minHeight: "100%", paddingBottom: 64 },
        ]}
      >
        <EditAppointment navigation={navigation}  id ={id}/>
      </SafeAreaView>
    </GlobalLoader>
  );
};

export default SecurePageByPackage(EditAppointmentScreen, [
  "edit_appointments"
]);
