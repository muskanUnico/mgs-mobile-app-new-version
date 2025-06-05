import Button from "@/src/components/elements/Button/Button";
import CustomDropDown from "@/src/components/elements/CustomDropDown/CustomDropDown";
import Title from "@/src/components/elements/Title/Title";
import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeContext";
import { useTimeTracker } from "@/src/context/TimeTrackerContext";
import GlobalLoader from "@/src/features/GlobalLoader/GlobalLoader";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "@/src/helper/useLocalStorage";
import { useCreateTime, useGetTodayAppointment } from "@/src/hooks/TimeTracker";
import { convertDataFormat } from "@/src/utils/functions";
import { formatTime } from "@/src/utils/tools";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import OnlyTimeTracker from "../src/components/ui/TimeTracker/OnlyTimeTracker";
import TimeTrackerCardDetails from "../src/components/ui/TimeTracker/TimeTrackerCardDetails";

const TimeTracker = ({ navigation }: any) => {
  const { user } = useAuth();
  const { data } = useGetTodayAppointment(user?.id);
  const { setSelect, select, completedTime } = useTimeTracker();
  const { handleCreateTime, loading } = useCreateTime();

  useFocusEffect(
    useCallback(() => {
      if (select) {
        getItemFromLocalStorage("timeTrackerSelect");
      }
    }, [select])
  );

  const option = data.map((item) => ({
    value: item?.customerId?.id,
    label: `${item?.customerId?.name} ${formatTime(item?.start_time_range)}`,
  }));

  const handleSaveTime = () => {
    handleCreateTime(convertDataFormat(completedTime, user.id));
    removeItemFromLocalStorage("completedTime");
  };
  const { theme } = useTheme();

  return (
    <View style={[styles.screen, { backgroundColor: theme.brandGreyColor }]}>
      <Title navigation={navigation} title="Time Tracker" />
      <View style={styles.container}>
        <View style={styles.card}>
           <View style={styles.dropdownWrapper}>
            <CustomDropDown
              items={option}
              value={select}
              setValue={setSelect && setSelect}
              placeholder="Select Appointment"
            />
          </View>
          <OnlyTimeTracker />
        </View>
        {Object.keys(completedTime).length > 0 && (
          <>
            <TimeTrackerCardDetails />
             <View style={styles.buttonWrapper}>
              <Button
                onPress={handleSaveTime}
                loading={!loading}
                title="Save"
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const Index = (props) => (
  <GlobalLoader>
    <TimeTracker {...props} />
  </GlobalLoader>
);
export default Index;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    minHeight: "100%", // for full-screen height
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  card: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#f3f4f6", // Tailwind's gray-100
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: "#fff",
  },
  dropdownWrapper: {
    zIndex: 50, // For proper dropdown layering
    marginBottom: 20,
  },
  buttonWrapper: {
    marginTop: 20,
    marginHorizontal: 12,
  },
});
