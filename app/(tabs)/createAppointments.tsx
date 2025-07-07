import { useTheme } from "@/src/context/ThemeContext";
import CreateAppointmentFeature from "@/src/features/Appointment/CreateAppointment";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { SecurePageByPackage } from "@/src/middleware/PermissionAccess";
import React from "react";
import { SafeAreaView } from "react-native";

const createAppointments = ({ navigation }: any) => {
  const { theme } = useTheme();

  return (
    <GlobalLoader>
      <SafeAreaView style={{ backgroundColor: theme.brandWhiteColor, flex: 1 }}>
        <CreateAppointmentFeature navigation={navigation} />
      </SafeAreaView>
    </GlobalLoader>
  );
};

export default SecurePageByPackage(createAppointments, ["create_appointments"]);
