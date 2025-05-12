import { DrawerActions } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { View, TouchableWithoutFeedback } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTimeTracker } from "../../../context/TimeTrackerContext";
import { useTheme } from "../../../context/ThemeContext";

const Header = ({ navigation }: any) => {
  const { timerRunning } = useTimeTracker();
  const { theme } = useTheme();

  return (
    <View>
      <View
        style={[styles.customLayout, { backgroundColor: theme.brandColor }]}
      >
        <View style={styles.rowLayout}>
          <View style={styles.rightMargin}>
            <TouchableWithoutFeedback
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <Image
                source={require("../../../assets/images/menu.png")}
                style={{ width: hp(4), height: hp(4) }}
              />
              {/* <Feather name="menu" size={20} color="black" /> */}
            </TouchableWithoutFeedback>
          </View>

          {/* <EvilIcons name="bell" size={26} color="black" /> */}
          <Image
            source={require("../../../assets/images/logo.png")}
            style={[{ width: hp(7), height: hp(4.5) }, styles.leftMargin]}
          />
        </View>

        <View style={styles.rowLayout}>
          <View style={styles.rightMargin}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Timetracker")}
              style={styles.customRowLayout}
            >
              {/* <EvilIcons name="bell" size={26} color="black" /> */}

              {timerRunning ? (
                <Image
                  source={require("../../../assets/images/pause-icon.png")}
                  style={{ width: hp(4), height: hp(4), marginRight: 6 }}
                />
              ) : (
                <Image
                  source={require("../../../assets/images/timer.png")}
                  style={{ width: hp(3), height: hp(3), marginRight: 6 }}
                />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("notification")}
            style={styles.customRowLayout}
          >
            {/* <EvilIcons name="bell" size={26} color="black" /> */}
            <Image
              source={require("../../../assets/images/bell.png")}
              style={{ width: hp(3), height: hp(3), marginRight: 6 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  leftMargin: {
    marginLeft: 12,
  },
  customLayout: {
    paddingLeft: 8,
    paddingRight: 12,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 48,
  },
  customRowLayout: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 4,
  },

  rowLayout: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightMargin: {
    marginRight: 8,
  },
});
export default Header;
