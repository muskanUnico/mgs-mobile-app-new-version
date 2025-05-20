import Title from "@/src/components/elements/Title/Title";
import { useTheme } from "@/src/context/ThemeContext";
import ViewAppointmentFeature from "@/src/features/Appointment/ViewAppointment";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import { SecurePageByPackage } from "@/src/middleware/PermissionAccess";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native";

const ViewAppointmentScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { id } = useLocalSearchParams();

  return (
    <GlobalLoader>
      <SafeAreaView
        style={[
          { backgroundColor: theme.brandGreyColor },
          { minHeight: "100%", paddingBottom: 64 },
        ]}
      >
        <Title navigation={navigation} title="View Appoinment" />
1         <ViewAppointmentFeature navigation={navigation}  id={id} selectedTab={undefined} />
      </SafeAreaView>
    </GlobalLoader>
  );
};

export default SecurePageByPackage(ViewAppointmentScreen, [
  "view_appointments",
]);
