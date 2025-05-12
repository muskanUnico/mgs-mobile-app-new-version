import React from "react";
import { SafeAreaView } from "react-native";
import { useTheme } from "@/src/context/ThemeContext";
import Title from "@/src/components/elements/Title/Title";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { SecurePageByPackage } from "@/src/middleware/PermissionAccess";
import { setTeamMemberColors } from "@/src/hooks/TeamMembers";
import ApprovedAppointment from "@/src/features/Appointment/ApprovedAppointment/ApprovedAppointment";

const ApporovedAppointment = ({ navigation }: any) => {
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
        <Title navigation={navigation} title="Approved Appointments" />
        <ApprovedAppointment navigation={navigation} />
      </SafeAreaView>
    </GlobalLoader>
  );
};

export default SecurePageByPackage(ApporovedAppointment, ["view_appointments"]);
