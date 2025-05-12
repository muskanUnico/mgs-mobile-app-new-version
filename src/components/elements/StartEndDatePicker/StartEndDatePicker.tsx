import React, { useState } from "react";
import moment from "moment";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles as externalStyles } from "../../../assets/css";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from "../../../context/ThemeContext";

interface StartEndDatePickerProps {
  onDatesSelected: any;
  startDate: any;
  endDate: any;
}

const StartEndDatePicker: React.FC<StartEndDatePickerProps> = ({
  onDatesSelected,
  startDate,
  endDate,
}) => {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleStartDateChange = (
    event: any,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(Platform.OS === "ios");
    onDatesSelected("to", currentDate);
  };

  const handleEndDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(Platform.OS === "ios");
    onDatesSelected("from", currentDate);
  };

  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text style={[externalStyles.label, styles.marginStyle]}>
          Start Date
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowStartDatePicker(true)}
        >
          <Text style={styles.buttonText}>
            {moment(startDate).format("MMMM DD, YYYY")}
          </Text>
        </TouchableOpacity>
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={handleStartDateChange}
          />
        )}
      </View>
      <Entypo name="arrow-long-right" size={24} color={theme.brandBlackColor} />
      <View style={styles.pickerContainer}>
        <Text style={[externalStyles.label, styles.marginStyle]}>End Date</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowEndDatePicker(true)}
        >
          <Text style={styles.buttonText}>
            {moment(endDate).format("MMMM DD, YYYY")}
          </Text>
        </TouchableOpacity>
        {showEndDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={handleEndDateChange}
          />
        )}
      </View>
    </View>
  );
};

const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      flexDirection: "row",
      // alignItems: "center",
      gap: 9,
      marginTop: 10,
    },
    pickerContainer: {
      flexDirection: "column",
    },
    label: {
      marginRight: 10,
      fontSize: 18,
      fontFamily: "BoldText",
    },
    button: {
      backgroundColor: theme.brandPastelColor,
      borderColor: theme.brandColor,
      borderRadius: 20,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderWidth: 1,
    },
    buttonText: {
      color: "black",
      fontSize: 12,
      fontFamily: "BoldText",
    },
    marginStyle: {
      marginLeft: 12,
      marginBottom: 4,
    },
  });
};

export default StartEndDatePicker;
