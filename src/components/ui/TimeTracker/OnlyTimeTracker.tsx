// react
import React from "react";

// monent
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet, Text, View } from "react-native";
import { useTimeTracker } from "../../../context/TimeTrackerContext";

const OnlyTimeTracker = () => {
  const { formatTime, startTimer, time, timerRunning, stopTimer } =
    useTimeTracker();
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.timerText}>
          {formatTime(time?.hours)}:{formatTime(time?.minutes)}:
          {formatTime(time?.seconds)}
        </Text>
        <View>
          {timerRunning ? (
            <FontAwesome
              name="stop"
              size={24}
              color="red"
              onPress={stopTimer}
            />
          ) : (
            <AntDesign
              name="playcircleo"
              size={24}
              color="black"
              onPress={startTimer}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "white",
    marginHorizontal: "5%", // responsive spacing
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 16,
    paddingLeft: 8,
    paddingVertical: 8,
  },
  timerText: {
    fontSize: 18,
    color: "black",
    fontFamily: "BoldText",
  },
});

export default OnlyTimeTracker;
