import moment from "moment";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  View,
  Text,
  Platform,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";

const SingleDatePicker = ({ date, setDate }: any) => {
  const [showPicker, setShowPicker] = useState(false);

  const [selectedDate, setSelectedDate] = useState(
    (date && new Date(date)) || new Date()
  );

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === "ios");
    setDate(currentDate);
    setSelectedDate(currentDate);
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => setShowPicker(true)}>
        <View style={styles.textRounded}>
          <Text style={[styles.blueText, { fontFamily: "Regular" }]}>
            {moment(selectedDate).format("MM/DD/YYYY")}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default SingleDatePicker;
const styles = StyleSheet.create({
  textRounded: {
    fontSize: 13,
    borderRadius: 24, 
    paddingRight: 20, 
  },
  blueText: {
    color: "#60A5FA",
  },
});
