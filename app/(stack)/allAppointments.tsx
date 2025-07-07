import Title from "@/src/components/elements/Title/Title";
import { useTheme } from "@/src/context/ThemeContext";
import AllAppointment from "@/src/features/Appointment/AllAppointment/AllAppointment";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { setTeamMemberColors } from "@/src/hooks/TeamMembers";
import { SecurePageByPackage } from "@/src/middleware/PermissionAccess";
import React from "react";
import { SafeAreaView } from "react-native";


const AllAppointmentScreen = ({ navigation }: any) => {
  setTeamMemberColors();
  const { theme } = useTheme();

  return (
    <GlobalLoader>
      <SafeAreaView
        style={[
          { backgroundColor: theme.brandGreyColor },
          { minHeight: "100%" , paddingBottom:60},
        ]}
      >
        <Title  title="All Appointments" />
        <AllAppointment navigation={navigation} />
      </SafeAreaView>
    </GlobalLoader>
  );
};

export default SecurePageByPackage(AllAppointmentScreen, ["view_appointments"]);