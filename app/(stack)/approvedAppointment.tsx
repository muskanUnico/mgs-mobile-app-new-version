import Title from "@/src/components/elements/Title/Title";
import { useTheme } from "@/src/context/ThemeContext";
import ApprovedAppointment from "@/src/features/Appointment/ApprovedAppointment/ApprovedAppointment";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { setTeamMemberColors } from "@/src/hooks/TeamMembers";
import { SecurePageByPackage } from "@/src/middleware/PermissionAccess";
import React from "react";
import { SafeAreaView } from "react-native";

const approvedAppointments = ({ navigation }: any) => {
  setTeamMemberColors();
  const { theme } = useTheme();
  return (
    <GlobalLoader>
      <SafeAreaView
        style={[
          { backgroundColor: theme.brandGreyColor },
          { minHeight: "100%" ,paddingBottom:60 },
        ]}
      >
        <Title navigation={navigation} title="Approved Appointments" />
        <ApprovedAppointment navigation={navigation} />
      </SafeAreaView>
    </GlobalLoader>
  );
};

export default SecurePageByPackage(approvedAppointments, ["view_appointments"]);
