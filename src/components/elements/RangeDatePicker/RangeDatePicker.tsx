import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { useTheme } from "../../../context/ThemeContext";
import Button from "../Button/Button";

const RangeDatePicker = ({ start, end, setStart, setEnd }: any) => {
  const [selectedDates, setSelectedDates] = useState<{
    [key: string]: {
      startingDay?: boolean;
      endingDay?: boolean;
      color: string;
      textColor: string;
    };
  }>({});
  const [selectedDatesText, setSelectedDatesText] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (start && end) {
      setSelectedDatesText(`${start} to ${end}`);
    } else if (start) {
      setSelectedDatesText(`${start}`);
    } else {
      setSelectedDatesText("");
    }
  }, [start, end]);
  
  const onDayPress = (day: DateData) => {
    const date = day.dateString;
    if (!start || (start && end)) {
      setStart(date);
      setEnd(null);
      setSelectedDates({
        [date]: { startingDay: true, color: "#50cebb", textColor: "white" },
      });
    } else if (start && !end) {
      if (new Date(date) < new Date(start)) {
        setStart(date);
        setSelectedDates({
          [date]: { startingDay: true, color: "#50cebb", textColor: "white" },
        });
      } else {
        setEnd(date);
        let rangeDates = {};
        let tempDate = new Date(start);
        while (tempDate <= new Date(date)) {
          const currentDate = tempDate.toISOString().split("T")[0];
          rangeDates = {
            ...rangeDates,
            [currentDate]: {
              color: "#70d7c7",
              textColor: "white",
              ...(currentDate === start && { startingDay: true }),
              ...(currentDate === date && { endingDay: true }),
            },
          };
          tempDate.setDate(tempDate.getDate() + 1);
        }
        setSelectedDates(rangeDates);
      }
    }
  };

  const handleModalClose = () => {
    if (start && end) {
      setSelectedDatesText(`${start} to ${end}`);
    }
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
         <Text style={[styles.textSlate950, { fontFamily: "BoldText" }]}>
         Select a Range</Text>
         <Text style={[styles.textSlate950, { fontFamily: "Regular" }]}>
          {selectedDatesText}</Text>
        </View>
      </TouchableWithoutFeedback>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={onDayPress}
              markedDates={selectedDates}
              markingType={"period"}
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
    textSlate950: {
      color: '#020617',
    },
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
    shadowColor: "#000", 
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
});
}


export default RangeDatePicker;
