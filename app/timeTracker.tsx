import { styles as externalStyles } from "@/src/assets/css";
import TrackerCustomDuration from "@/src/components/TrackerCustomDuration";
import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeContext";
import { useTimeTracker } from "@/src/context/TimeTrackerContext";
import { useGetTodayAppointment } from "@/src/hooks/TimeTracker";
import moment from "moment";
import React, { useState } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";

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
//   console.log("user in TimeTrackerCardDetails:", user);


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
//   console.log("completedTime:", completedTime);
  
  
//   console.log("data from hook:", data);




  return (
    <>
      {Object.entries(completedTime).map(
        ([appointmentId, appointmentData]: any) => {
          const id = appointmentData?.[0]?.appointmentId || "";
          const customer = data.filter(
            (item: any) => item?.customerId?.id == id
          );

          return (
            <View
              key={appointmentId}
              style={[
                externalStyles.pinkcard,
                {
                  paddingHorizontal: 16,
                  paddingVertical: 24,
                  marginHorizontal: 12,
                  marginTop: 20,
                  height: "auto",
                },
              ]}
            >
              <View>
                <Text
                  style={[
                    externalStyles.label,
                    { color: theme.brandColor, fontSize: 18 },
                  ]}
                >
                  {moment(new Date()).format("DD MMM YYYY")}
                </Text>
                <Text
                  style={[
                    externalStyles.globalFontLight,
                    { fontSize: 16, paddingVertical: 8 },
                  ]}
                >
                  {customer[0]?.customerId.name}
                </Text>
                {appointmentData.map((appointment: any, index: number) => (
                  <View key={index}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
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
                        <Text style={{ color: "#2563eb" }}>
                          {appointment.start_time}
                        </Text>
                      </TouchableWithoutFeedback>
                      <Text
                        style={[
                          externalStyles.globalFontLight,
                          { marginHorizontal: 8 },
                        ]}
                      >
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
                        <Text style={{ color: "#2563eb" }}>
                          {appointment.end_time}
                        </Text>
                      </TouchableWithoutFeedback>
                    </View>
                    <View style={{ marginTop: 8 }}>
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
        }
      )}

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

export default TimeTrackerCardDetails;
