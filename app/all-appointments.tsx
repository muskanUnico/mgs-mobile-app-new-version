import React from "react";
import { SafeAreaView } from "react-native";
import { useTheme } from "@/src/context/ThemeContext";
import Title from "@/src/components/elements/Title/Title";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { SecurePageByPackage } from "@/src/middleware/PermissionAccess";
import AllAppointment from "@/src/features/Appointment/AllAppointment/AllAppointment";
import { setTeamMemberColors } from "@/src/hooks/TeamMembers";

const AllAppointmentScreen = ({ navigation }: any) => {
  setTeamMemberColors();
  const { theme } = useTheme();

  return (
    <GlobalLoader>
      <SafeAreaView
        style={[
          { backgroundColor: theme.brandGreyColor },
          { minHeight: "100%" },
        ]}
      >
        <Title navigation={navigation} title="All Appointments" />
        <AllAppointment navigation={navigation} />
      </SafeAreaView>
    </GlobalLoader>
  );
};

export default SecurePageByPackage(AllAppointmentScreen, ["view_appointments"]);
