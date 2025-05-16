import React from "react";
import { SafeAreaView } from "react-native";
import { useTheme } from "@/src/context/ThemeContext";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import CreateAppointmentFeature from "@/src/features/Appointment/CreateAppointment";
import { SecurePageByPackage } from "@/src/middleware/PermissionAccess";

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
