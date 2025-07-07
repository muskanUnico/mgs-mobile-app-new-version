//@ts-nocheck
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { styles as externalStyles } from "../../assets/css";
import Button from "../../components/elements/Button/Button";
import Title from "../../components/elements/Title/Title";
import {
  borderColor
} from "../../constants/COLORS";
import { useTheme } from "../../context/ThemeContext";
import { updateStaffHours } from "../../hooks/TeamMembers/StaffHours";
import GlobalLoader from "../GlobalLoader/GlobalLoader";
import { convertTimes } from "./features";
import TimePickerModal from "./TimePickerModal";

interface TimeSlot {
  start_time: moment.Moment;
  end_time: moment.Moment;
}

interface DayAvailability {
  available: boolean;
  timeslot: TimeSlot[];
}

interface StaffMemberModalProps {
  route: any;
  user?: any; 
  navigation?: any;
}
const TeamMemberHours = ({ navigation, route , user}: StaffMemberModalProps) => {
  // const user = route.params.user;
  let timetable = user.staffHours?.timetable;
  const updateHours = updateStaffHours(user.id);
  const [showPicker, setShowPicker] = useState(false);

  const [formData, setFormData] = useState({
    onlineBooking: user.staffHours?.onlineBooking,
    timetable: timetable,
  });

  let defaultData: Record<string, any> = user.staffHours?.timetable || {};

  type ValidDay =
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";

  const initTime = (defaultTime?: string) => {
    const start_time = defaultTime
      ? moment(defaultTime)
      : moment()
          .set("hour", 12)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);
    const end_time = start_time.clone().add(1, "hour");
    return { start_time, end_time };
  };

  const [days, setDays] = useState<{ [day in ValidDay]: DayAvailability }>({
    monday: { available: false, timeslot: [] },
    tuesday: { available: false, timeslot: [] },
    wednesday: { available: false, timeslot: [] },
    thursday: { available: false, timeslot: [] },
    friday: { available: false, timeslot: [] },
    saturday: { available: false, timeslot: [] },
    sunday: { available: false, timeslot: [] },
  });

  const convertToRealTime = (timeInNumber: number) => {
    const timeString = timeInNumber.toString().padStart(4, "0");
    const hours = parseInt(timeString.slice(0, 2));
    const minutes = parseInt(timeString.slice(2));
    const time = moment().set("hour", hours).set("minute", minutes);
    return time;
  };

  useFocusEffect(
    useCallback(() => {
      if (defaultData) {
        const updatedDays: any = { ...days };

        for (let day in updatedDays) {
          if (
            defaultData.hasOwnProperty(day) &&
            defaultData[day] &&
            defaultData[day]?.length > 0
          ) {
            updatedDays[day].available = true;
            updatedDays[day].timeslot = defaultData[day].map((slot: any) => ({
              start_time: convertToRealTime(slot.start_time),
              end_time: convertToRealTime(slot.end_time),
            }));
          }
        }
        setDays(updatedDays);
      }
    }, [defaultData])
  );

  const handleDayCheck = (day: ValidDay) => {
    setDays((prevDays) => {
      const old = prevDays[day];
      const available = !old.available;
      let timeslot = old.timeslot;

      if (timeslot.length === 0 && available) {
        const oldTimeSlot = defaultData[day];

        if (oldTimeSlot) {
          if (oldTimeSlot?.length > 0) {
            timeslot = oldTimeSlot.map((slot: any) => ({
              start_time: convertToRealTime(slot.start_time),
              end_time: convertToRealTime(slot.end_time),
            }));
          } else {
            const newTimeSlot = initTime(
              oldTimeSlot[oldTimeSlot.length - 1]?.end_time
            );
            timeslot.push(newTimeSlot);
          }
        } else {
          const newTimeSlot = initTime();
          timeslot.push(newTimeSlot);
        }
      }

      if (!available) {
        timeslot = [];
      }

      const item = {
        [day]: {
          ...old,
          available,
          timeslot,
        },
      };

      return { ...prevDays, ...item };
    });
  };

  const addTimeSlot = (day: ValidDay) => {
    setDays((prevDays) => {
      const oldTimeSlot = prevDays[day].timeslot;
      const newTimeSlot = initTime(
        String(oldTimeSlot[oldTimeSlot.length - 1]?.end_time)
      );

      return {
        ...prevDays,
        [day]: {
          available: true,
          timeslot: [...prevDays[day].timeslot, newTimeSlot],
        },
      };
    });
  };

  const removeTimeSlot = (day: ValidDay, index: number) => {
    setDays((prevDays) => {
      let timeslot = prevDays[day].timeslot.filter((_, i) => i !== index);

      return {
        ...prevDays,
        [day]: {
          available: timeslot.length !== 0,
          timeslot: timeslot,
        },
      };
    });
  };

  const handleOnlineBooking = (booking: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      onlineBooking: booking,
    }));
  };

  const submit = () => {
    updateHours.submit(formData);
  };

  const [index, setIndex] = useState(-1);
  const [day, setDay] = useState("");
  const [type, setType] = useState("");

  const onChange = (selectedHour: string, selectedMintue: string) => {
    const newTime = moment(
      selectedHour + ":" + selectedMintue,
      "HH:mm"
    ).toDate();

    console.log(newTime, "bkjbkjhjhjhjhjh");

    setDays((prevDays) => ({
      ...prevDays,
      [day]: {
        ...prevDays[day],
        timeslot: prevDays[day].timeslot.map((item, i) =>
          i === index ? { ...item, [type]: newTime } : item
        ),
      },
    }));
  };

  useEffect(() => {
    const convertTimeTableDataIntoApiFormat = convertTimes(days);
    setFormData((prevData) => ({
      ...prevData,
      timetable: convertTimeTableDataIntoApiFormat,
    }));
  }, [days]);

  const styles = useStyles();
  const { theme } = useTheme();
  return (
    <GlobalLoader>
      <View
        style={{
          backgroundColor: theme.brandGreyColor,
          minHeight: "100%", paddingBottom:60
        }}
      >
        <Title title="Manage Location" navigation={navigation} />
        <View style={{ marginHorizontal: 20 }}>
          <View style={{ marginVertical: 12 }}>
            <Text
              style={[
                externalStyles.iconColorStyle,
                { color: theme.brandColor },
              ]}
            >
              Manage Location for {user.name}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel} style={{ fontFamily: "BoldText" }}>
              Online Booking:
            </Text>
            <Switch
              value={formData.onlineBooking}
              onValueChange={(e) => handleOnlineBooking(e)}
              thumbColor={
                formData.onlineBooking
                  ? theme.brandPastelColor
                  : theme.brandGreyColor
              }
              trackColor={{ true: theme.brandColor, false: borderColor }}
              style={styles.switch}
            />
          </View>

          {Object.keys(days).map((day) => {
            return (
              <View
                key={day}
                style={[
                  styles.dayContainer,
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  },
                ]}
              >
                <View style={styles.checkboxContainer}>
                  <Switch
                    value={days[day].available}
                    onValueChange={() => handleDayCheck(day as ValidDay)}
                    thumbColor={
                      formData.onlineBooking
                        ? theme.brandPastelColor
                        : theme.brandGreyColor
                    }
                    trackColor={{ true: theme.brandColor, false: borderColor }}
                    style={styles.switch}
                  />
                  <Text
                    style={styles.dayLabel}
                    style={{ fontFamily: "BoldText" }}
                  >
                    {String(day).toUpperCase()}
                  </Text>
                </View>
                {days[day].available && (
                  <View style={styles.timeslotContainer}>
                    {days[day].timeslot.map((slot, index) => (
                      <View
                        key={index}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <View>
                          <TouchableWithoutFeedback
                            onPress={() => (
                              setShowPicker(true),
                              setDay(day),
                              setIndex(index),
                              setType("start_time")
                            )}
                          >
                            <View
                              style={{
                                borderRadius: 24,
                                marginRight: 4,
                              }}
                            >
                              <Text
                                style={{
                                  color: "#60a5fa",
                                  fontFamily: "Regular",
                                }}
                              >
                                {moment(slot.start_time).format(`HH:mm`)}
                              </Text>
                            </View>
                          </TouchableWithoutFeedback>

                          {showPicker && type != "end_time" && (
                            <TimePickerModal
                              isTime={slot?.start_time}
                              setModal={setShowPicker}
                              modal={showPicker}
                              onChange={onChange}
                            />
                          )}
                        </View>
                        <Text style={{ marginHorizontal: 4 }}>:</Text>

                        <View style={{ marginLeft: 4 }}>
                          <TouchableWithoutFeedback
                            onPress={() => (
                              setShowPicker(true),
                              setDay(day),
                              setIndex(index),
                              setType("end_time")
                            )}
                          >
                            <View
                              style={{
                                borderRadius: 24,
                                marginRight: 12,
                              }}
                            >
                              <Text
                                style={{
                                  color: "#60A5FA",
                                  fontFamily: "Regular",
                                }}
                              >
                                {moment(slot.end_time).format(`HH:mm`)}
                              </Text>
                            </View>
                          </TouchableWithoutFeedback>

                          {showPicker && type != "start_time" && (
                            <TimePickerModal
                              value={slot?.end_time}
                              setModal={setShowPicker}
                              modal={showPicker}
                              onChange={onChange}
                            />
                          )}
                        </View>

                        <TouchableOpacity
                          onPress={() => removeTimeSlot(day as ValidDay, index)}
                        >
                          <Text style={[styles.removeIcon, { marginRight: 4 }]}>
                            x
                          </Text>
                        </TouchableOpacity>
                        {index === days[day].timeslot.length - 1 ? (
                          <TouchableOpacity
                            onPress={() => addTimeSlot(day as ValidDay)}
                          >
                            <Text style={styles.addIcon}>+</Text>
                          </TouchableOpacity>
                        ) : (
                          <View style={{ width: 20 }} />
                        )}
                      </View>
                    ))}
                  </View>
                )}
              </View>
            );
          })}
          <View style={{ marginVertical: 16, marginHorizontal: 16 }}>
            <Button
              loading={updateHours.loading}
              mode="contained"
              onPress={submit}
              title=" Save"
            />
          </View>
        </View>
      </View>
    </GlobalLoader>
  );
};

const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    modalHeader: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    closeIcon: {
      fontSize: 20,
      color: "#D1D6DB",
      fontFamily: "BoldText",
    },
    modalTitle: {
      textAlign: "center",
      fontWeight: "600",
      flex: 1,
    },
    divider: {
      height: 1,
      backgroundColor: "#D1D6DB",
      marginVertical: 10,
    },
    switchContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 10,
      marginBottom: 20,
    },
    switchLabel: {
      fontSize: 16,
      marginRight: 10,
    },
    dayContainer: {
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 5,
    },
    dayLabel: {
      fontSize: 16,
      marginLeft: 10,
    },
    timeslotContainer: {
      marginLeft: 20,
    },
    timeSlot: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 5,
    },
    removeIcon: {
      fontSize: 20,
      color: theme.brandBlackColor,
      marginLeft: 10,
    },
    addIcon: {
      fontSize: 25,
      color: theme.brandColor,
      marginLeft: 10,
      fontFamily: "BoldText",
    },
    switch: {
      ...(Platform.OS === "ios" && {
        transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
      }),
    },
  });
};

export default TeamMemberHours;
