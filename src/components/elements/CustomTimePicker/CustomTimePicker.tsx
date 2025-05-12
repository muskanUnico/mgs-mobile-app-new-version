import moment from "moment";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { View, Text, Platform, TouchableWithoutFeedback,StyleSheet } from "react-native";
import { styles as externalStyles } from "../../../assets/css";

const CustomTimePicker = ({ setTime, time, timeformate }: any) => {
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event: any, selectedTime: any) => {
    const currentTime = selectedTime || time;
    setShowPicker(Platform.OS === "ios");
    setTime(currentTime);
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => setShowPicker(true)}>
        <View style={styles.textStyle}>
        <Text style={[styles.blueText, externalStyles.globalFontLight]}>
        {moment(time).format(`${timeformate}`)}
          </Text>
        </View>
      </TouchableWithoutFeedback>

      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={onChange}
          is24Hour={true}
        />
      )}
    </View>
  );
};

export default CustomTimePicker;
const styles = StyleSheet.create({
  textStyle: {
    fontSize: 13,        // text-[13px] = 13px font size
    borderRadius: 24,    // rounded-3xl
  },
  blueText: {
    color: '#60a5fa',  // blue-400 color
  },
});
