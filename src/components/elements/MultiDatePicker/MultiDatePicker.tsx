import React, { useEffect, useState } from "react";
import { Calendar, DateData } from "react-native-calendars";
import { View, Text, StyleSheet, Modal } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import Button from "../Button/Button";
import moment from "moment";
import { useTheme } from "../../../context/ThemeContext";

const MultiDatePicker = ({ value, setValue }: any) => {
  const [selectedDates, setSelectedDates] = useState<{
    [key: string]: { selected: boolean };
  }>({});
  const [selectedDatesText, setSelectedDatesText] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);

  const transformedDates = value?.reduce((acc: any, date: any) => {
    acc[moment(date).format("YYYY-MM-DD")] = { selected: true };
    return acc;
  }, {});

  useEffect(() => {
    if (value) {
      setSelectedDates(transformedDates);
      const dates = Object.keys(transformedDates).sort().join(", ");
      setSelectedDatesText(dates);
    }
  }, [value]);

  const onDayPress = (day: DateData) => {
    const date = day.dateString;
    setSelectedDates((prev) => {
      const newDates = { ...prev };
      if (newDates[date]) {
        delete newDates[date];
      } else {
        newDates[date] = { selected: true };
      }
      return newDates;
    });
  };

  const handleModalClose = () => {
    const dates = Object.keys(selectedDates).sort().join(", ");
    setSelectedDatesText(dates);
    setValue(Object.keys(selectedDates).sort());
    setModalVisible(false);
  };
  const styles = useStyles();
  const { theme } = useTheme();
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View
          style={{ borderBottomWidth: 1, borderColor: "black", width: "100%" }}
        >
          <Text style={[styles.slateText, { fontFamily: "BoldText" }]}>
            Select Individual Dates
          </Text>
          <Text style={[styles.slateText, { fontFamily: "Regular" }]}>
            {selectedDatesText}
          </Text>
        </View>
      </TouchableWithoutFeedback>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={onDayPress}
              markedDates={selectedDates}
              markingType={"multi-dot"}
            />
            <Button title="Close" onPress={handleModalClose} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    calendarContainer: {
      backgroundColor: theme.brandWhiteColor,
      borderRadius: 10,
      padding: 20,
      elevation: 5,
      shadowColor: theme.brandBlackColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
    },
    closeButton: {
      marginTop: 20,
      backgroundColor: theme.brandColor,
      padding: 10,
      borderRadius: 5,
    },
    closeButtonText: {
      color: theme.brandWhiteColor,
      fontSize: 18,
    },
    slateText: {
      color: "#020617",
    },
  });
};

export default MultiDatePicker;
