import { styles as externalStyles } from "@/src/assets/css";
import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeContext";
import { useTimeTracker } from "@/src/context/TimeTrackerContext";
import { useGetTodayAppointment } from "@/src/hooks/TimeTracker";
import moment from "moment";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import TrackerCustomDuration from "../../TrackerCustomDuration";

interface Appointment {
  appointmentId: string;
  customerId: { id: string; name: string };
  start_time: string;
  end_time: string;
}

interface CompletedTime {
  [key: string]: Appointment[];
}

const TimeTrackerCardDetails = () => {
  const { completedTime, setCompletedTime } = useTimeTracker();
  const { user } = useAuth();
  const { data } = useGetTodayAppointment(user?.id);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedHour, setSelectedHour] = useState("00");
  const [currentAppointmentId, setCurrentAppointmentId] = useState<
    string | null
  >(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isStartTime, setIsStartTime] = useState(true);

  const handleSaveDuration = () => {
    if (currentAppointmentId !== null && currentIndex !== null) {
      const newTime = `${selectedHour}:${selectedMinute}:00`;
      setCompletedTime((prevCompletedTime: CompletedTime) => {
        const updatedCompletedTime = { ...prevCompletedTime };
        const appointmentData = updatedCompletedTime[currentAppointmentId];
        const updatedAppointment = { ...appointmentData[currentIndex] };

        if (isStartTime) {
          updatedAppointment.start_time = newTime;
        } else {
          updatedAppointment.end_time = newTime;
        }

        appointmentData[currentIndex] = updatedAppointment;
        return updatedCompletedTime;
      });
    }
    setModalVisible(false);
  };

  const handleDateChange = (
    id: string,
    index: number,
    appointment: Appointment,
    isStart: boolean
  ) => {
    const timeParts = isStart
      ? appointment.start_time.split(":")
      : appointment.end_time.split(":");
    setSelectedMinute(timeParts[1]);
    setSelectedHour(timeParts[0]);
    setIsStartTime(isStart);
    setCurrentAppointmentId(id);
    setCurrentIndex(index);
    setModalVisible(true);
  };
  const { theme } = useTheme();

  return (
    <>
      {Object.entries(completedTime).map(([appointmentId, appointmentData]:any) => {
        const id = appointmentData?.[0]?.appointmentId || "";
        const customer = data.filter((item: any) => item?.customerId?.id == id);

        return (
          <View
            key={appointmentId}
            style={[styles.card, externalStyles.pinkcard]}
          >
            <View>
            <Text style={[styles.dateText, externalStyles.label, { color: theme.brandColor }]}>
                {moment(new Date()).format("DD MMM YYYY")}
              </Text>
                 <Text style={[styles.customerName, externalStyles.globalFontLight]}>
                {customer[0]?.customerId.name}
              </Text>
              {appointmentData.map((appointment:any, index:number) => (
                <View key={index}>
                   <View style={styles.timeRow}>
                    <TouchableWithoutFeedback
                      onPress={() =>
                        handleDateChange(
                          appointmentId,
                          index,
                          appointment,
                          true
                        )
                      }
                    >
                      <Text style={styles.timeText}>
                        {appointment.start_time}
                      </Text>
                    </TouchableWithoutFeedback>
                     <Text style={[styles.toText, externalStyles.globalFontLight]}>
                      to
                    </Text>
                    <TouchableWithoutFeedback
                      onPress={() =>
                        handleDateChange(
                          appointmentId,
                          index,
                          appointment,
                          false
                        )
                      }
                    >
                       <Text style={styles.timeText}>
                        {appointment.end_time}
                      </Text>
                    </TouchableWithoutFeedback>
                  </View>
                <View style={styles.durationContainer}>
                    <Text style={externalStyles.globalFontLight}>
                      Duration:
                      {moment
                        .utc(
                          moment(appointment.end_time, "HH:mm:ss").diff(
                            moment(appointment.start_time, "HH:mm:ss")
                          )
                        )
                        .format("HH:mm:ss")}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        );
      })}

      <TrackerCustomDuration
        modal={modalVisible}
        setModal={setModalVisible}
        handleSaveDuration={handleSaveDuration}
        setSelectedMinute={setSelectedMinute}
        setSelectedHour={setSelectedHour}
        selectedMinute={selectedMinute}
        selectedHour={selectedHour}
      />
    </>
  );
};


const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 16, // px-4
    paddingVertical: 24,   // py-6
    marginHorizontal: 12,  // mx-3
    marginTop: 20,         // mt-5
    // h-fit is default in RN, so no height restriction
  },
  dateText: {
    fontSize: 18,
  },
  customerName: {
    fontSize: 16,
    paddingVertical: 8, // py-2
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    color: "#2563eb", // Tailwind's blue-600
  },
  toText: {
    marginHorizontal: 8, // mx-2
  },
  durationContainer: {
    marginTop: 8, // mt-2
  },
});


export default TimeTrackerCardDetails;
